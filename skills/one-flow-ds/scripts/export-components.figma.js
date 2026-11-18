// Несколько наборов DS v2 за один вызов (только чтение). Запуск: use_figma в файле tlHFo5v7I0fXFxtlAApApw.
// Вписать IDS. Для каждого набора: описание, свойства, base — дерево варианта по умолчанию, axes — отличия по каждой оси.
// Слоёв больше 8 в одном родителе — показываются первые 3 и счётчик (дни календаря, строки списка).
// Токены — именем, непривязанные значения — со знаком «!». Градиенты — стопы с токенами; у эллипса — дуга.
const IDS = ['698:8453'];
const vc = {}; const vn = async a => { if (!a) return null; if (!(a.id in vc)) { const v = await figma.variables.getVariableByIdAsync(a.id); vc[a.id] = v ? v.name : a.id; } return vc[a.id]; };
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
const sc = {}; const sn = async id => { if (!id || typeof id !== 'string') return null; if (!(id in sc)) { const s = await figma.getStyleByIdAsync(id); sc[id] = s ? s.name : id; } return sc[id]; };
const col = async (c, bv, op) => (bv ? await vn(bv) : '!' + hex(c)) + ((op !== undefined && op < 1) ? ' @' + Math.round(op * 100) + '%' : '') + ((c.a !== undefined && c.a < 1) ? ' a' + Math.round(c.a * 100) : '');
async function paints(arr) { if (!Array.isArray(arr) || !arr.length) return undefined; const o = []; for (const p of arr) { if (p.visible === false) continue;
  if (p.type === 'SOLID') o.push(await col(p.color, p.boundVariables && p.boundVariables.color, p.opacity));
  else if (p.type.startsWith('GRADIENT')) { const st = []; for (const s of p.gradientStops) st.push(await col(s.color, s.boundVariables && s.boundVariables.color) + ' ' + Math.round(s.position * 100) + '%'); o.push(p.type.slice(9).toLowerCase() + '(' + st.join(', ') + ')'); }
  else o.push(p.type.toLowerCase()); } return o.length ? o.join(' + ') : undefined; }
async function num(n, k) { const b = n.boundVariables && n.boundVariables[k]; if (b) return await vn(b); const v = n[k]; return typeof v === 'number' ? Math.round(v * 100) / 100 : v; }
async function describe(n) {
  const d = { t: n.type[0] + n.type[1] }; if (!n.visible) d.hidden = true;
  d.size = (n.boundVariables && n.boundVariables.width ? await vn(n.boundVariables.width) : Math.round(n.width * 10) / 10) + '×' + (n.boundVariables && n.boundVariables.height ? await vn(n.boundVariables.height) : Math.round(n.height * 10) / 10);
  if (n.opacity < 1) d.opacity = Math.round(n.opacity * 100) / 100;
  if (n.layoutMode && n.layoutMode !== 'NONE') { d.layout = n.layoutMode[0] + (n.layoutWrap === 'WRAP' ? 'w' : ''); d.pad = [await num(n, 'paddingTop'), await num(n, 'paddingRight'), await num(n, 'paddingBottom'), await num(n, 'paddingLeft')].join(' '); d.gap = await num(n, 'itemSpacing'); d.align = n.primaryAxisAlignItems.toLowerCase() + '/' + n.counterAxisAlignItems.toLowerCase(); }
  if (n.parent && n.parent.layoutMode && n.parent.layoutMode !== 'NONE') { d.fit = n.layoutSizingHorizontal.toLowerCase() + '/' + n.layoutSizingVertical.toLowerCase(); if (n.layoutPositioning === 'ABSOLUTE') d.abs = Math.round(n.x) + ',' + Math.round(n.y); }
  else if (n.parent && n.parent.type !== 'COMPONENT_SET' && n.parent.type !== 'PAGE') d.xy = Math.round(n.x) + ',' + Math.round(n.y);
  if (n.minWidth) d.minW = await num(n, 'minWidth'); if (n.maxWidth) d.maxW = await num(n, 'maxWidth'); if (n.minHeight) d.minH = await num(n, 'minHeight');
  if ('topLeftRadius' in n) { const r = [await num(n, 'topLeftRadius'), await num(n, 'topRightRadius'), await num(n, 'bottomRightRadius'), await num(n, 'bottomLeftRadius')]; if (r.some(x => x !== 0)) d.radius = r.every(x => x === r[0]) ? r[0] : r.join(' '); }
  if (n.type === 'ELLIPSE' && n.arcData && (n.arcData.endingAngle - n.arcData.startingAngle < 6.28 || n.arcData.innerRadius)) d.arc = [n.arcData.startingAngle, n.arcData.endingAngle, n.arcData.innerRadius].map(x => Math.round(x * 100) / 100).join(' ');
  if (n.rotation) d.rot = Math.round(n.rotation);
  const f = await paints(n.fills); if (f && n.type !== 'TEXT') d.fill = f;
  const s = await paints(n.strokes); if (s) { d.stroke = s; d.sw = await num(n, 'strokeWeight'); d.sa = n.strokeAlign && n.strokeAlign[0].toLowerCase(); if (n.dashPattern && n.dashPattern.length) d.dash = n.dashPattern.join(' '); if (n.strokeCap && n.strokeCap !== 'NONE' && typeof n.strokeCap === 'string') d.cap = n.strokeCap.toLowerCase(); }
  if (n.effectStyleId) d.fx = await sn(n.effectStyleId); else if (n.effects && n.effects.some(e => e.visible)) d.fx = '!' + n.effects.filter(e => e.visible).map(e => e.type).join('+');
  if (n.type === 'TEXT') { d.text = n.characters.slice(0, 36); d.style = typeof n.textStyleId === 'string' && n.textStyleId ? await sn(n.textStyleId) : '!' + String(n.fontSize); d.color = await paints(n.fills); if (n.textAlignHorizontal !== 'LEFT') d.ta = n.textAlignHorizontal.toLowerCase(); if (n.textTruncation === 'ENDING') d.trunc = n.maxLines || 1; }
  if (n.type === 'INSTANCE') { const m = await n.getMainComponentAsync(); d.of = m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name + ' {' + m.name + '}' : m.name) : '?';
    const v = n.findOne(x => x.type === 'VECTOR' || x.type === 'BOOLEAN_OPERATION'); if (v && /^icon\//.test(d.of)) { const vf = await paints(v.strokes && v.strokes.length ? v.strokes : v.fills); if (vf) d.ink = vf; }
    if (!/^icon\//.test(d.of)) { const ic = n.findOne(x => x.type === 'INSTANCE'); if (ic) { const m2 = await ic.getMainComponentAsync(); if (m2 && /^icon\//.test(m2.parent ? m2.parent.name : '')) d.icon = m2.parent.name.slice(5); } } }
  return d;
}
async function tree(r) { const o = {}; const w = async (n, p) => { o[p] = await describe(n); if ('children' in n && n.type !== 'INSTANCE') { const seen = {}; const kids = n.children.length > 8 ? n.children.slice(0, 3) : n.children; if (n.children.length > 8) o[p + '/…'] = 'ещё ' + (n.children.length - 3) + ' слоёв (' + [...new Set(n.children.map(c => c.name))].slice(0, 6).join(', ') + ')'; for (const c of kids) { const k = seen[c.name] = (seen[c.name] || 0) + 1; await w(c, p + '/' + c.name + (k > 1 ? '#' + k : '')); } } }; await w(r, '.'); return o; }
function diff(a, b) { const o = {}; for (const p of new Set([...Object.keys(a), ...Object.keys(b)])) { if (!a[p]) { o[p] = 'NEW ' + JSON.stringify(b[p]); continue; } if (!b[p]) { o[p] = 'GONE'; continue; } const d = {}; for (const k of new Set([...Object.keys(a[p]), ...Object.keys(b[p])])) { if (k === 'text') continue; if (JSON.stringify(a[p][k]) !== JSON.stringify(b[p][k])) d[k] = b[p][k] === undefined ? '—' : b[p][k]; } if (Object.keys(d).length) o[p] = d; } return o; }
const props = n => Object.fromEntries(n.name.split(', ').map(s => s.split('=')));
const res = [];
for (const id of IDS) {
  const set = await figma.getNodeByIdAsync(id);
  if (set.type === 'COMPONENT') { res.push({ id, name: set.name, desc: set.description, base: await tree(set) }); continue; }
  const def = set.defaultVariant, dp = props(def);
  const find = w => set.children.find(c => { const p = props(c); return Object.entries(w).every(([k, v]) => p[k] === v); });
  const base = await tree(def); const axes = {};
  for (const ax of Object.keys(dp)) { axes[ax] = {}; for (const v of set.componentPropertyDefinitions[ax].variantOptions) { if (v === dp[ax]) continue; const c = find({ ...dp, [ax]: v }); axes[ax][v] = c ? diff(base, await tree(c)) : 'нет'; } }
  res.push({ id, name: set.name, desc: set.description, default: def.name, base, axes });
}
return res;
