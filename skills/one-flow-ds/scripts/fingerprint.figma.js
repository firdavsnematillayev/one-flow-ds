// Отпечаток DS v2 (только чтение): контрольная сумма каждого компонента и набора на страницах библиотеки.
// Запуск: use_figma в файле tlHFo5v7I0fXFxtlAApApw, вставить весь текст.
// Возвращает { marker, at, sets: { id: [страница, имя, хэш] } } — сравнить с references/figma-fingerprint.json:
//   node scripts/sync-check.cjs <журнал сессии .jsonl> <marker>   → что изменилось, добавилось, пропало.
// Доски правил («… rules (DS2)» и др.) — хэш их текста. В хэш компонента входит всё, что видно в коде: описание и свойства набора; у каждого варианта и слоя — тип, имя, видимость,
// размеры, авто-лейаут (отступы, промежутки — именем токена), радиусы, заливки и обводки (токен или HEX), эффекты,
// текстовый стиль, цвет и текст, главный компонент экземпляра и его переопределения. Положение вариантов на холсте не входит.
const MARKER = 'FINGERPRINT-' + Date.now();
const SKIP_PAGES = /^(changelog|researches|cover|draft|---.*)$/;
const vc = {}; const vn = async a => { if (!a) return null; if (!(a.id in vc)) { const v = await figma.variables.getVariableByIdAsync(a.id); vc[a.id] = v ? v.name : a.id; } return vc[a.id]; };
const sc = {}; const sn = async id => { if (!id || typeof id !== 'string') return null; if (!(id in sc)) { const s = await figma.getStyleByIdAsync(id); sc[id] = s ? s.name : id; } return sc[id]; };
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
const r1 = x => typeof x === 'number' ? Math.round(x * 10) / 10 : x;
async function paints(arr) { if (!Array.isArray(arr)) return arr === undefined ? undefined : 'mixed'; const o = []; for (const p of arr) { if (p.visible === false) continue;
  if (p.type === 'SOLID') o.push((p.boundVariables && p.boundVariables.color ? await vn(p.boundVariables.color) : hex(p.color)) + (p.opacity < 1 ? '@' + r1(p.opacity) : ''));
  else if (p.type.startsWith('GRADIENT')) { const st = []; for (const s of p.gradientStops) st.push((s.boundVariables && s.boundVariables.color ? await vn(s.boundVariables.color) : hex(s.color)) + ' ' + r1(s.position)); o.push(p.type + '(' + st.join(',') + ')'); }
  else o.push(p.type + (p.imageHash ? ':' + p.imageHash.slice(0, 8) : '')); } return o.join('+'); }
async function num(n, k) { const b = n.boundVariables && n.boundVariables[k]; return b ? await vn(b) : r1(n[k]); }
async function d(n) {
  const o = [n.type, n.name, n.visible ? 1 : 0, r1(n.width), r1(n.height)];
  if (n.opacity !== undefined && n.opacity < 1) o.push('op' + r1(n.opacity));
  if (n.rotation) o.push('rot' + Math.round(n.rotation));
  if ('layoutMode' in n && n.layoutMode !== 'NONE') o.push(n.layoutMode, await num(n, 'paddingTop'), await num(n, 'paddingRight'), await num(n, 'paddingBottom'), await num(n, 'paddingLeft'), await num(n, 'itemSpacing'), n.primaryAxisAlignItems, n.counterAxisAlignItems, n.layoutWrap);
  if (n.parent && 'layoutMode' in n.parent && n.parent.layoutMode !== 'NONE') { o.push(n.layoutSizingHorizontal, n.layoutSizingVertical); if (n.layoutPositioning === 'ABSOLUTE') o.push('abs', r1(n.x), r1(n.y)); }
  else if (n.parent && n.parent.type !== 'COMPONENT_SET' && n.parent.type !== 'PAGE') o.push('xy', r1(n.x), r1(n.y));
  if ('topLeftRadius' in n) o.push('r', await num(n, 'topLeftRadius'), await num(n, 'topRightRadius'), await num(n, 'bottomRightRadius'), await num(n, 'bottomLeftRadius'));
  if ('fills' in n) o.push('f', await paints(n.fills));
  if ('strokes' in n && n.strokes.length) o.push('s', await paints(n.strokes), r1(n.strokeWeight === figma.mixed ? -1 : n.strokeWeight), n.strokeAlign, (n.dashPattern || []).join(' '));
  if ('effectStyleId' in n) o.push('fx', n.effectStyleId ? await sn(n.effectStyleId) : (n.effects || []).filter(e => e.visible).map(e => e.type + r1(e.radius)).join('+'));
  if (n.type === 'TEXT') o.push('t', n.characters, typeof n.textStyleId === 'string' ? await sn(n.textStyleId) : 'mixed', n.textAlignHorizontal, n.textTruncation);
  if (n.type === 'ELLIPSE' && n.arcData) o.push('arc', r1(n.arcData.startingAngle), r1(n.arcData.endingAngle), r1(n.arcData.innerRadius));
  if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION') { o.push('v', n.vectorPaths ? n.vectorPaths.map(p => p.data).join(' ').length : 0); return o; }
  if (n.componentPropertyReferences) o.push('ref', JSON.stringify(n.componentPropertyReferences));
  if (n.type === 'INSTANCE') { const m = await n.getMainComponentAsync(); o.push('of', m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name + '{' + m.name + '}' : m.name) : '?');
    for (const ov of n.overrides || []) { const x = await figma.getNodeByIdAsync(ov.id); if (!x) continue; o.push('ov', ov.overriddenFields.slice().sort().join(','), 'fills' in x ? await paints(x.fills) : '', 'strokes' in x && x.strokes.length ? await paints(x.strokes) : '', x.type === 'TEXT' ? x.characters : '', x.visible ? 1 : 0); }
    return o; }
  if ('children' in n) { const c = []; for (const k of n.children) c.push(await d(k)); o.push(c); }
  return o;
}
const H = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
const sets = {}; const t0 = Date.now();
for (const p of figma.root.children) {
  if (SKIP_PAGES.test(p.name)) continue;
  await p.loadAsync();
  const nodes = p.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] }).filter(n => n.type === 'COMPONENT_SET' || n.parent.type !== 'COMPONENT_SET');
  for (const n of nodes) {
    if (/^[._]|example|app shell/i.test(n.name)) continue;
    let inside = false; for (let x = n.parent; x && x.type !== 'PAGE'; x = x.parent) if (x.type === 'COMPONENT' || x.type === 'COMPONENT_SET' || x.type === 'INSTANCE') inside = true;
    if (inside) continue;
    const defs = n.componentPropertyDefinitions;
    const head = [n.description, Object.entries(defs).map(([k, v]) => k.split('#')[0] + ':' + v.type + ':' + JSON.stringify(v.defaultValue) + ':' + (v.variantOptions || []).join('|')).sort()];
    const kids = n.type === 'COMPONENT_SET' ? n.children.slice().sort((a, b) => a.name < b.name ? -1 : 1) : [n];
    const body = []; for (const v of kids) body.push(await d(v));
    sets[n.id] = [p.name, n.name, H(JSON.stringify([head, body]))];
  }
  // доски правил (гайдлайны): текст целиком, по порядку
  for (const b of p.children.filter(c => /rules/i.test(c.name) && 'findAll' in c)) sets[b.id] = [p.name, b.name, H(JSON.stringify(b.findAll(x => x.type === 'TEXT').map(t => t.characters)))];
}
return { marker: MARKER, at: new Date().toISOString(), count: Object.keys(sets).length, ms: Date.now() - t0, sets };
