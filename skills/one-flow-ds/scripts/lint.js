// One Flow DS v2 — проверка фрейма на соответствие дизайн-системе.
// Запуск: через use_figma в файле с макетом. Перед запуском заменить TARGET на id фрейма
// (или оставить пустым — тогда проверяется текущее выделение).
// Только читает, ничего не меняет. Возвращает список замечаний.

const TARGET = ''; // например '123:456'

const ROLE_PREFIX = /^(surface|label|outline|chart|root|shadow|opacity)\//;
const TEXT_STYLE_PREFIX = /^(web|web-m|app|mono)\//;
const FONTS = ['Onest', 'JetBrains Mono'];
const RADII = [0, 4, 8, 12, 16, 24];
const SPACE = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64];
const DS_NAMES = ['button', 'icon-button', 'input', 'input-outline', 'textarea', 'search', 'chip', 'badge', 'counter',
  'status', 'avatar', 'tab', 'tabs', 'toggle', 'checkbox', 'radio', 'list-item', 'menu', 'menu-item', 'tooltip',
  'popover', 'alert', 'toast', 'modal', 'dialog', 'drawer', 'table-row', 'table-cell', 'nav-bar', 'side-bar',
  'side-bar-item', 'page-header', 'post', 'comment', 'empty-state'];

const issues = [];
let checked = 0;
const add = (node, level, issue) => { if (issues.length < 300) issues.push({ id: node.id, name: node.name.slice(0, 50), level, issue }); };
const varCache = {};
const varName = async (id) => { if (!(id in varCache)) { try { const v = await figma.variables.getVariableByIdAsync(id); varCache[id] = v ? v.name : '?'; } catch (e) { varCache[id] = '?'; } } return varCache[id]; };
const styleCache = {};
const styleName = async (id) => { if (!(id in styleCache)) { try { const s = await figma.getStyleByIdAsync(id); styleCache[id] = s ? s.name : '?'; } catch (e) { styleCache[id] = '?'; } } return styleCache[id]; };

async function checkPaints(node, key, label) {
  const paints = node[key];
  if (!Array.isArray(paints)) return;
  for (const p of paints) {
    if (p.visible === false) continue;
    if (p.type === 'SOLID') {
      const id = p.boundVariables && p.boundVariables.color && p.boundVariables.color.id;
      if (!id) { add(node, 'error', label + ': цвет задан вручную (HEX), а не токеном colors'); continue; }
      const n = await varName(id);
      if (!ROLE_PREFIX.test(n)) add(node, 'error', label + ': переменная «' + n + '» — не роль colors (palette/brand напрямую нельзя)');
    } else if (p.type.startsWith('GRADIENT')) {
      const unbound = p.gradientStops.some(s => !(s.boundVariables && s.boundVariables.color));
      if (unbound) add(node, 'warning', label + ': градиент с цветами не из токенов (градиент — только как поверхность, по брендбуку)');
    }
  }
}

async function visit(node, inInstance) {
  checked++;
  if (node.visible === false) return;

  if (node.type === 'INSTANCE') {
    try {
      const mc = await node.getMainComponentAsync();
      if (!mc) add(node, 'error', 'экземпляр без главного компонента (компонент удалён)');
      else if (!mc.remote) add(node, 'info', 'локальный компонент «' + mc.name + '» — в макетах продукта брать компоненты из библиотеки design systems v2');
    } catch (e) {}
    // внутренности экземпляра принадлежат библиотеке — не проверяем
    return;
  }

  if (node.type === 'FRAME' && DS_NAMES.includes(node.name.toLowerCase())) add(node, 'warning', 'фрейм назван как компонент DS — возможно, компонент отвязан (detach)');

  if ('fills' in node && node.type !== 'TEXT') await checkPaints(node, 'fills', 'заливка');
  if ('strokes' in node) await checkPaints(node, 'strokes', 'обводка');

  if (node.type === 'TEXT') {
    await checkPaints(node, 'fills', 'цвет текста');
    if (node.textStyleId === figma.mixed) add(node, 'warning', 'в одном тексте несколько стилей');
    else if (!node.textStyleId) add(node, 'error', 'текст без текстового стиля');
    else { const sn = await styleName(node.textStyleId); if (!TEXT_STYLE_PREFIX.test(sn)) add(node, 'error', 'стиль «' + sn + '» не из DS v2 (нужны web/, web-m/, app/, mono/)'); }
    const fam = node.fontName === figma.mixed ? null : node.fontName.family;
    if (fam && !FONTS.includes(fam)) add(node, 'error', 'шрифт ' + fam + ' — в DS только Onest и JetBrains Mono');
  }

  if ('cornerRadius' in node && node.type !== 'ELLIPSE' && node.type !== 'TEXT') {
    const r = node.cornerRadius;
    const bound = node.boundVariables && (node.boundVariables.topLeftRadius || node.boundVariables.cornerRadius);
    if (typeof r === 'number' && r > 0 && !bound) {
      const pill = Math.abs(r - Math.min(node.width, node.height) / 2) < 1 || r >= 999;
      if (!RADII.includes(Math.round(r)) && !pill) add(node, 'warning', 'радиус ' + Math.round(r) + ' вне шкалы 4/8/12/16/24/пилюля');
    }
  }

  if ('effects' in node && node.effects.some(e => e.visible !== false) && !node.effectStyleId) add(node, 'warning', 'тень или размытие без стиля эффекта (shadow/*, effect/glass, focus/ring)');

  if ((node.type === 'FRAME' || node.type === 'COMPONENT') && node.layoutMode && node.layoutMode !== 'NONE') {
    const b = node.boundVariables || {};
    const vals = { itemSpacing: node.itemSpacing, paddingTop: node.paddingTop, paddingRight: node.paddingRight, paddingBottom: node.paddingBottom, paddingLeft: node.paddingLeft };
    const off = Object.entries(vals).filter(([k, v]) => !b[k] && typeof v === 'number' && v >= 0 && !SPACE.includes(Math.round(v)) && node.primaryAxisAlignItems !== 'SPACE_BETWEEN');
    if (off.length) add(node, 'warning', 'отступы вне шкалы space: ' + off.map(([k, v]) => k + '=' + Math.round(v)).join(', '));
  }

  if ('children' in node) for (const c of node.children) await visit(c, inInstance);
}

let roots = [];
if (TARGET) { const n = await figma.getNodeByIdAsync(TARGET); if (!n) throw new Error('Узел ' + TARGET + ' не найден'); roots = [n]; }
else roots = figma.currentPage.selection;
if (!roots.length) throw new Error('Нет цели: укажите TARGET или выделите фрейм');

for (const r of roots) await visit(r, false);

const count = l => issues.filter(i => i.level === l).length;
return {
  target: roots.map(r => r.id + ' ' + r.name),
  checkedNodes: checked,
  summary: { error: count('error'), warning: count('warning'), info: count('info') },
  truncated: issues.length >= 300,
  issues
};
