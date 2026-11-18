#!/usr/bin/env node
// tokens.json → assets/tokens.css + assets/typography.css. Без зависимостей, Node 18+.
//   node scripts/build-tokens.mjs          собрать CSS
//   node scripts/build-tokens.mjs --hash   контрольная сумма tokens.json (сверка с export-tokens.figma.js)
// Имена CSS-переменных = имена в Figma, «/» → «-»: colors/surface/page → --surface-page,
// palette/blue/600 → --palette-blue-600, brand/brand/600 → --brand-600, space/16 → --space-16.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = readFileSync(join(root, 'references/tokens.json'), 'utf8');
const T = JSON.parse(raw);

if (process.argv.includes('--hash')) {
  const s = JSON.stringify(T); let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  console.log(h.toString(16), s.length); process.exit(0);
}

const slug = n => n.replace(/\//g, '-').replace(/\s+/g, '-');
const PREFIX = { palette: 'palette-', brand: '', colors: '', size: '', space: '', radius: '', typography: '', motion: '', layout: '', layer: '' };
const cssName = (col, name) => '--' + PREFIX[col] + slug(name);
const val = e => (e && typeof e === 'object' && !Array.isArray(e) && 'v' in e) ? e.v : e;
const mode = (v, i) => Array.isArray(v) ? v[i] : v;
const ref = (v, unit = '') => {
  if (typeof v === 'string') { const m = v.match(/^\{([^:]+):(.+)\}$/); if (m) return `var(${cssName(m[1], m[2])})`; return v; }
  return typeof v === 'number' ? v + unit : String(v);
};
const decl = (name, v) => `  ${name}: ${v};`;
const block = (sel, lines) => `${sel} {\n${lines.join('\n')}\n}`;

// ---------- примитивы и размеры (:root) ----------
const prim = [];
prim.push('  /* palette — сырые шкалы, в макетах и коде не использовать напрямую */');
for (const [n, e] of Object.entries(T.palette)) prim.push(decl(cssName('palette', n), ref(val(e))));
prim.push('  /* brand — шкала бренда (режим One Flow); клиент: <html data-brand="client-example"> */');
for (const [n, e] of Object.entries(T.brand)) prim.push(decl(cssName('brand', n), ref(mode(val(e), 0))));
prim.push('  /* size */');
for (const [n, e] of Object.entries(T.size)) prim.push(decl(cssName('size', n), ref(val(e), 'px')));
prim.push('  /* space */');
const spaces = Object.entries(T.space).sort((a, b) => val(a[1]) - val(b[1]));
for (const [n, e] of spaces) prim.push(decl(cssName('space', n), ref(val(e), 'px')));
prim.push('  /* radius */');
for (const [n, e] of Object.entries(T.radius)) prim.push(decl(cssName('radius', n), ref(val(e), 'px')));
prim.push('  /* motion */');
for (const [n, e] of Object.entries(T.motion)) prim.push(decl(cssName('motion', n), ref(val(e), 'ms')));
prim.push('  /* layer (z-index) */');
for (const [n, e] of Object.entries(T.layer)) prim.push(decl(cssName('layer', n), ref(val(e))));
prim.push('  /* layout — Desktop; Tablet и Mobile ниже в @media */');
const LAYOUT_UNIT = n => n === 'grid/columns' ? '' : 'px';
for (const [n, e] of Object.entries(T.layout)) prim.push(decl(cssName('layout', n), ref(mode(val(e), 0), LAYOUT_UNIT(n))));
prim.push('  /* typography — семейства и размеры (составные стили — typography.css) */');
const FALLBACK = { 'Onest': '"Onest", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', 'JetBrains Mono': '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace' };
const WEIGHT = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700, ExtraBold: 800 };
for (const [n, e] of Object.entries(T.typography)) {
  const v = val(e);
  if (n.startsWith('font/family/')) prim.push(decl(cssName('typography', n), FALLBACK[v] || `"${v}"`));
  else if (n.startsWith('font/weight/')) prim.push(decl(cssName('typography', n), WEIGHT[v]));
  else prim.push(decl(cssName('typography', n), ref(v, 'px')));
}

const layoutMode = i => Object.entries(T.layout).filter(([, e]) => Array.isArray(val(e))).map(([n, e]) => decl(cssName('layout', n), ref(val(e)[i], LAYOUT_UNIT(n))));

// ---------- роли цвета: 4 режима ----------
const colorLines = i => {
  const out = [];
  for (const [n, e] of Object.entries(T.colors)) {
    if (n.startsWith('root/')) continue; // root/brand/* — одинаковы во всех режимах, на :root
    const v = mode(val(e), i);
    out.push(decl(cssName('colors', n), n.startsWith('opacity/') ? v / 100 : ref(v)));
  }
  return out;
};
const rootBrand = Object.entries(T.colors).filter(([n]) => n.startsWith('root/')).map(([n, e]) => decl(cssName('colors', n), ref(val(e))));

// ---------- эффекты (зависят от цвета темы → объявляются в каждом блоке темы) ----------
const effectLines = () => Object.entries(T.effects).map(([n, e]) => {
  if (e.layers[0].type === 'background-blur') return decl('--' + slug(n), `blur(${e.layers[0].blur}px)`);
  const parts = e.layers.map(l => `${l.type === 'inner' ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${ref(l.color)}`);
  return decl('--' + slug(n), parts.join(', '));
});

const MODES = ['Light', 'Dark', 'Light · contrast', 'Dark · contrast'];
const SEL = [
  [':root', '[data-theme="light"]'],
  ['[data-theme="dark"]'],
  ['[data-theme="light"][data-contrast="more"]', ':root[data-contrast="more"]:not([data-theme="dark"])'],
  ['[data-theme="dark"][data-contrast="more"]']
];
const MEDIA = [
  null,
  ['@media (prefers-color-scheme: dark)', ':root:not([data-theme="light"])'],
  ['@media (prefers-contrast: more)', ':root:not([data-theme="dark"])'],
  ['@media (prefers-contrast: more) and (prefers-color-scheme: dark)', ':root:not([data-theme="light"])']
];
const themeBlock = (i, sel) => block(sel, [...colorLines(i), '  /* effects */', ...effectLines(), `  color-scheme: ${i % 2 ? 'dark' : 'light'};`]);

let css = `/* One Flow DS v2 — токены. СГЕНЕРИРОВАНО из references/tokens.json (scripts/build-tokens.mjs), руками не править.
   Источник: ${T.meta.source}, выгрузка ${T.meta.exported}.
   Тема: по системе; принудительно <html data-theme="light|dark">; повышенный контраст: data-contrast="more" или системная настройка.
   Тёмный или светлый остров внутри страницы: data-theme на любом элементе.
   Бренд клиента (white-label): <html data-brand="client-example"> — только на корне.
   Шрифты: <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"> */

${block(':root', [...prim, '  /* root/brand — роли шкалы бренда */', ...rootBrand])}

${block('[data-brand="client-example"]', Object.entries(T.brand).map(([n, e]) => decl(cssName('brand', n), ref(mode(val(e), 1)))))}

@media (max-width: 1023px) {
${block('  :root', layoutMode(1).map(l => '  ' + l))}
}
@media (max-width: 639px) {
${block('  :root', layoutMode(2).map(l => '  ' + l))}
}

/* ---- ${MODES[0]} ---- */
${themeBlock(0, SEL[0].join(',\n'))}
`;
for (const i of [1, 2, 3]) {
  css += `\n/* ---- ${MODES[i]} ---- */\n`;
  css += `${MEDIA[i][0]} {\n${themeBlock(i, MEDIA[i][1]).replace(/^/gm, '  ')}\n}\n`;
  if (i === 3) {
    // тёмный контраст должен идти последним: иначе светлый контраст перебивает его при равной специфичности
    css += `@media (prefers-contrast: more) {\n${themeBlock(3, ':root[data-theme="dark"]').replace(/^/gm, '  ')}\n}\n`;
    css += `@media (prefers-color-scheme: dark) {\n${themeBlock(3, ':root[data-contrast="more"]:not([data-theme="light"])').replace(/^/gm, '  ')}\n}\n`;
  }
  css += themeBlock(i, SEL[i].join(',\n')) + '\n';
}

// ---------- typography.css ----------
const pct = t => t.endsWith('%') ? (parseFloat(t) / 100) + 'em' : t;
const fam = (f, n) => f === 'JetBrains Mono' ? 'var(--font-family-mono)' : /\/(display|large-title|title-\d|headline)$/.test(n) ? 'var(--font-family-heading)' : 'var(--font-family-body)';
let ty = `/* One Flow DS v2 — текстовые стили. СГЕНЕРИРОВАНО из references/tokens.json, руками не править.
   Подключать после tokens.css. Каждый стиль — переменная --text-<группа>-<имя> (шорткат font)
   + --tracking-… + класс .text-<группа>-<имя>. Группы: web (от 1024), web-m (мобильный веб), app (iOS/Android), mono (цифры, время, ID). */

:root {
`;
for (const [n, s] of Object.entries(T.text)) {
  const k = slug(n);
  ty += `  --text-${k}: ${WEIGHT[s.weight]} ${s.size}px/${s.lineHeight}px ${fam(s.font, n)};\n  --tracking-${k}: ${pct(s.tracking)};\n`;
}
ty += '}\n\n';
for (const [n, s] of Object.entries(T.text)) {
  const k = slug(n);
  ty += `/* ${n} — ${s.desc} */\n.text-${k} { font: var(--text-${k}); letter-spacing: var(--tracking-${k});${s.case === 'UPPER' ? ' text-transform: uppercase;' : ''}${s.font === 'JetBrains Mono' ? ' font-variant-numeric: tabular-nums;' : ''} }\n`;
}

mkdirSync(join(root, 'assets'), { recursive: true });
writeFileSync(join(root, 'assets/tokens.css'), css);
writeFileSync(join(root, 'assets/typography.css'), ty);
console.log('tokens.css', css.length, 'typography.css', ty.length, 'colors', Object.keys(T.colors).length, 'text', Object.keys(T.text).length);
