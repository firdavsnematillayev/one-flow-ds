// Спецификация компонента DS v2 из Figma (только чтение). Запуск: use_figma в файле tlHFo5v7I0fXFxtlAApApw.
// Вписать SET_ID (id набора) и при необходимости COLOR_AXES — оси, которые красят компонент (их сочетания выгружаются целиком, только цвет).
// Возвращает:
//   base   — дерево варианта по умолчанию: слой → размеры, авто-лейаут, радиусы, заливки/обводки (имя токена), текстовый стиль, иконка;
//   axes   — для каждой оси: значение → отличия от base (все свойства), остальные оси по умолчанию;
//   colors — для сочетаний COLOR_AXES: отличия только по цвету, прозрачности и видимости.
// Значения, привязанные к переменной, пишутся именем токена (`surface/brand/brand`, `space/12`); непривязанные — числом/HEX со знаком «!».
const SET_ID = '652:3960';
const COLOR_AXES = ['style', 'state'];

const set = await figma.getNodeByIdAsync(SET_ID);
const vcache = {};
const vn = async a => { if (!a) return null; if (!(a.id in vcache)) { const v = await figma.variables.getVariableByIdAsync(a.id); vcache[a.id] = v ? v.name : a.id; } return vcache[a.id]; };
const hex = c => { const h = x => Math.round(x * 255).toString(16).padStart(2, '0'); return '#' + h(c.r) + h(c.g) + h(c.b); };
const scache = {};
const sn = async id => { if (!id || typeof id !== 'string') return null; if (!(id in scache)) { const s = await figma.getStyleByIdAsync(id); scache[id] = s ? s.name : id; } return scache[id]; };

async function paints(arr, bv) {
  if (!Array.isArray(arr) || !arr.length) return undefined;
  const out = [];
  for (const p of arr) {
    if (p.visible === false) continue;
    if (p.type !== 'SOLID') { out.push(p.type.toLowerCase()); continue; }
    const t = p.boundVariables && p.boundVariables.color ? await vn(p.boundVariables.color) : '!' + hex(p.color);
    out.push(t + (p.opacity !== undefined && p.opacity < 1 ? ' @' + Math.round(p.opacity * 100) + '%' : ''));
  }
  return out.length ? out.join(' + ') : undefined;
}
async function num(node, key) {
  const b = node.boundVariables && node.boundVariables[key];
  if (b) return await vn(b);
  const v = node[key];
  return typeof v === 'number' ? (Math.round(v * 100) / 100) : v;
}
async function describe(n) {
  const d = { type: n.type };
  if (!n.visible) d.hidden = true;
  d.size = Math.round(n.width * 10) / 10 + '×' + Math.round(n.height * 10) / 10;
  if (n.opacity !== undefined && n.opacity < 1) d.opacity = Math.round(n.opacity * 100) / 100;
  if ('layoutMode' in n && n.layoutMode && n.layoutMode !== 'NONE') {
    d.layout = n.layoutMode.toLowerCase();
    d.pad = [await num(n, 'paddingTop'), await num(n, 'paddingRight'), await num(n, 'paddingBottom'), await num(n, 'paddingLeft')].join(' ');
    d.gap = await num(n, 'itemSpacing');
    d.align = n.primaryAxisAlignItems.toLowerCase() + '/' + n.counterAxisAlignItems.toLowerCase();
    d.sizing = n.primaryAxisSizingMode.toLowerCase() + '/' + n.counterAxisSizingMode.toLowerCase();
  }
  if ('layoutSizingHorizontal' in n && n.parent && 'layoutMode' in n.parent && n.parent.layoutMode !== 'NONE') d.fit = n.layoutSizingHorizontal.toLowerCase() + '/' + n.layoutSizingVertical.toLowerCase();
  if ('minWidth' in n && n.minWidth) d.minW = await num(n, 'minWidth');
  if ('minHeight' in n && n.minHeight) d.minH = await num(n, 'minHeight');
  if ('topLeftRadius' in n) {
    const r = [await num(n, 'topLeftRadius'), await num(n, 'topRightRadius'), await num(n, 'bottomRightRadius'), await num(n, 'bottomLeftRadius')];
    if (r.some(x => x !== 0)) d.radius = r.every(x => x === r[0]) ? r[0] : r.join(' ');
  }
  const f = await paints(n.fills, n.boundVariables); if (f && n.type !== 'TEXT') d.fill = f;
  const s = await paints(n.strokes); if (s) { d.stroke = s; d.strokeW = await num(n, 'strokeWeight'); d.strokeAlign = n.strokeAlign && n.strokeAlign.toLowerCase(); if (n.dashPattern && n.dashPattern.length) d.dash = n.dashPattern.join(' '); }
  if (n.effectStyleId) d.effect = await sn(n.effectStyleId); else if (n.effects && n.effects.some(e => e.visible)) d.effect = '!' + n.effects.filter(e => e.visible).map(e => e.type).join('+');
  if (n.type === 'TEXT') {
    d.text = n.characters.length > 40 ? n.characters.slice(0, 40) + '…' : n.characters;
    d.style = n.textStyleId && typeof n.textStyleId === 'string' ? await sn(n.textStyleId) : '!' + (typeof n.fontSize === 'number' ? n.fontSize : 'mixed');
    d.color = await paints(n.fills);
    if (n.textAutoResize) d.resize = n.textAutoResize.toLowerCase();
    if (n.textTruncation && n.textTruncation !== 'DISABLED') d.truncate = true;
  }
  if (n.type === 'INSTANCE') {
    const mc = await n.getMainComponentAsync();
    d.of = mc ? (mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name + ' {' + mc.name + '}' : mc.name) : '?';
    // цвет векторов иконки
    const vec = n.findOne(x => x.type === 'VECTOR' || x.type === 'BOOLEAN_OPERATION');
    if (vec) { const vf = await paints(vec.strokes && vec.strokes.length ? vec.strokes : vec.fills); if (vf) d.ink = vf; }
  }
  const refs = n.componentPropertyReferences; if (refs) { const r = Object.entries(refs).map(([k, v]) => k + '→' + v.split('#')[0]); if (r.length) d.prop = r.join(', '); }
  return d;
}
async function tree(root) {
  const out = {};
  const walk = async (n, path) => {
    out[path] = await describe(n);
    if ('children' in n && n.type !== 'INSTANCE') {
      const seen = {};
      for (const c of n.children) { const k = seen[c.name] = (seen[c.name] || 0) + 1; await walk(c, path + '/' + c.name + (k > 1 ? '#' + k : '')); }
    }
  };
  await walk(root, '.');
  return out;
}
const COLOR_KEYS = ['fill', 'stroke', 'color', 'ink', 'opacity', 'hidden', 'effect', 'of'];
function diff(a, b, keys) {
  const out = {};
  for (const p of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (!a[p]) { out[p] = 'NEW ' + JSON.stringify(b[p]); continue; }
    if (!b[p]) { out[p] = 'GONE'; continue; }
    const d = {};
    for (const k of new Set([...Object.keys(a[p]), ...Object.keys(b[p])])) {
      if (keys && !keys.includes(k)) continue;
      if (k === 'text') continue;
      if (JSON.stringify(a[p][k]) !== JSON.stringify(b[p][k])) d[k] = b[p][k] === undefined ? '—' : b[p][k];
    }
    if (Object.keys(d).length) out[p] = d;
  }
  return out;
}
const props = n => Object.fromEntries(n.name.split(', ').map(s => s.split('=')));
const def = set.defaultVariant;
const dp = props(def);
const axesNames = Object.keys(dp);
const find = want => set.children.find(c => { const p = props(c); return Object.entries(want).every(([k, v]) => p[k] === v); });
const base = await tree(def);
const axes = {};
for (const ax of axesNames) {
  axes[ax] = {};
  for (const v of set.componentPropertyDefinitions[Object.keys(set.componentPropertyDefinitions).find(k => k === ax)].variantOptions) {
    if (v === dp[ax]) continue;
    const c = find({ ...dp, [ax]: v });
    axes[ax][v] = c ? diff(base, await tree(c)) : 'нет варианта';
  }
}
const colors = {};
if (COLOR_AXES.length === 2) {
  const [A, B] = COLOR_AXES;
  const defs = set.componentPropertyDefinitions;
  for (const a of defs[A].variantOptions) for (const b of defs[B].variantOptions) {
    const c = find({ ...dp, [A]: a, [B]: b });
    if (!c) { colors[a + ' · ' + b] = 'нет варианта'; continue; }
    const t = await tree(c);
    const slim = {}; for (const [p, d] of Object.entries(t)) { const s = {}; for (const k of COLOR_KEYS) if (d[k] !== undefined) s[k] = d[k]; if (Object.keys(s).length) slim[p] = s; }
    colors[a + ' · ' + b] = slim;
  }
}
return { name: set.name, id: set.id, default: def.name, variants: set.children.length, base, axes, colors };
