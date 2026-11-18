// Выгрузка токенов DS v2 из Figma → tokens.json (только чтение).
// Запуск: use_figma в файле tlHFo5v7I0fXFxtlAApApw, вставить весь текст.
// Возвращает { hash, length, json }: json — содержимое references/tokens.json,
// hash — FNV-1a от JSON.stringify(json) (сверка с локальным файлом: node scripts/build-tokens.mjs --hash).
// Формат значения: строка HEX / число / ссылка "{коллекция:имя}"; у colors и layout — массив по режимам,
// одинаковое во всех режимах значение пишется одной строкой.

const SKIP_DESC = new Set(['brand']); // у шкалы бренда одно и то же описание у всех шагов — оно в meta
const hex = c => { const h = x => Math.round(x * 255).toString(16).padStart(2, '0'); return '#' + h(c.r) + h(c.g) + h(c.b) + ((c.a !== undefined && c.a < 1) ? h(c.a) : ''); };
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const colName = {}; for (const c of cols) colName[c.id] = c.name;
const all = await figma.variables.getLocalVariablesAsync();
const byId = Object.fromEntries(all.map(v => [v.id, v]));
const val = async raw => {
  if (raw && raw.type === 'VARIABLE_ALIAS') {
    const t = byId[raw.id] || await figma.variables.getVariableByIdAsync(raw.id);
    return '{' + colName[t.variableCollectionId] + ':' + t.name + '}';
  }
  if (raw && typeof raw === 'object' && 'r' in raw) return hex(raw);
  return raw;
};
const same = a => a.every(x => x === a[0]);

const out = {
  meta: {
    source: 'Figma tlHFo5v7I0fXFxtlAApApw «design systems v2»',
    exported: new Date().toISOString().slice(0, 10),
    note: 'Ссылка {коллекция:имя}. colors: [Light, Dark, Light · contrast, Dark · contrast]; layout: [Desktop, Tablet, Mobile]; brand: [One Flow, Client example]. Шкала brand — цвет бренда клиента (white-label): клиентский режим держит ту же светлоту, что One Flow на каждом шаге, поэтому роли сохраняют контраст.',
    modes: {}
  }
};
for (const c of cols) {
  if (c.name === 'interactions') continue; // служебная переменная прототипов Figma
  out.meta.modes[c.name] = c.modes.map(m => m.name);
  const entries = [];
  for (const id of c.variableIds) {
    const v = byId[id]; if (!v) continue;
    const vals = []; for (const m of c.modes) vals.push(await val(v.valuesByMode[m.modeId]));
    let e = c.modes.length === 1 || same(vals) ? vals[0] : vals;
    if (v.description && !SKIP_DESC.has(c.name)) e = { v: e, desc: v.description };
    entries.push([v.name, e]);
  }
  if (c.name === 'colors') entries.sort((a, b) => a[0] < b[0] ? -1 : 1);
  out[c.name] = Object.fromEntries(entries);
}

const ORDER = ['display', 'large-title', 'title-1', 'title-2', 'title-3', 'headline', 'body', 'callout', 'subheadline', 'footnote', 'caption-1', 'caption-2', 'overline'];
const GROUP = ['web', 'web-m', 'app', 'mono'];
const rank = n => { const [g, s] = n.split('/'); const base = s.replace(/-(medium|semibold)$/, ''); return GROUP.indexOf(g) * 1000 + ORDER.indexOf(base) * 10 + (s.endsWith('-medium') ? 1 : s.endsWith('-semibold') ? 2 : 0); };
const ts = (await figma.getLocalTextStylesAsync()).slice().sort((a, b) => rank(a.name) - rank(b.name));
out.text = {};
for (const s of ts) {
  const e = { font: s.fontName.family, weight: s.fontName.style, size: s.fontSize, lineHeight: s.lineHeight.unit === 'PIXELS' ? s.lineHeight.value : 'auto', tracking: (s.letterSpacing.unit === 'PERCENT' ? Math.round(s.letterSpacing.value * 100) / 100 + '%' : s.letterSpacing.value + 'px') };
  if (s.textCase !== 'ORIGINAL') e.case = s.textCase;
  if (s.description) e.desc = s.description;
  out.text[s.name] = e;
}

out.effects = {};
for (const s of await figma.getLocalEffectStylesAsync()) {
  const layers = [];
  for (const e of s.effects) {
    if (e.type === 'BACKGROUND_BLUR') { layers.push({ type: 'background-blur', blur: e.radius }); continue; }
    const cv = e.boundVariables && e.boundVariables.color;
    layers.push({ type: e.type === 'INNER_SHADOW' ? 'inner' : 'drop', x: e.offset.x, y: e.offset.y, blur: e.radius, spread: e.spread || 0, color: cv ? await val(cv) : hex(e.color) });
  }
  out.effects[s.name] = { layers, desc: s.description };
}
out.effects = Object.fromEntries(Object.entries(out.effects).sort((a, b) => a[0] < b[0] ? -1 : 1));

out.grids = {};
for (const g of await figma.getLocalGridStylesAsync()) {
  const l = g.layoutGrids[0]; const bv = l.boundVariables || {};
  const ref = async k => bv[k] ? await val(bv[k]) : l[k];
  out.grids[g.name] = l.pattern === 'GRID' ? { pattern: 'grid', size: l.sectionSize, desc: g.description } : { pattern: 'columns', count: await ref('count'), gutter: await ref('gutterSize'), margin: await ref('offset'), desc: g.description };
}

const s = JSON.stringify(out);
let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
return { hash: h.toString(16), length: s.length, json: out };
