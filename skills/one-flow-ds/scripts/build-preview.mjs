#!/usr/bin/env node
// assets/tokens.css + typography.css → assets/preview.html: доска токенов со встроенной самопроверкой.
// Самопроверка: для каждого режима выставляет атрибуты на <html>, читает итоговые значения всех ролей
// и сравнивает с ожидаемыми, посчитанными здесь из tokens.json. Итог — в шапке страницы и в window.__tokenTest.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const T = JSON.parse(readFileSync(join(root, 'references/tokens.json'), 'utf8'));
const tokensCss = readFileSync(join(root, 'assets/tokens.css'), 'utf8');
const typoCss = readFileSync(join(root, 'assets/typography.css'), 'utf8');

const val = e => (e && typeof e === 'object' && !Array.isArray(e) && 'v' in e) ? e.v : e;
const mode = (v, i) => Array.isArray(v) ? v[i] : v;
// разрешить ссылку до HEX для режима colors i и режима бренда b
function resolve(v, i, b = 0) {
  for (let guard = 0; guard < 10; guard++) {
    const m = typeof v === 'string' && v.match(/^\{([^:]+):(.+)\}$/);
    if (!m) return v;
    const [, col, name] = m;
    const e = T[col][name];
    v = col === 'colors' ? mode(val(e), i) : col === 'brand' ? mode(val(e), b) : val(e);
  }
  throw new Error('alias loop');
}
const slug = n => n.replace(/\//g, '-');
const roles = Object.keys(T.colors).filter(n => !n.startsWith('opacity/'));
const expected = {};
for (const i of [0, 1, 2, 3]) expected[i] = Object.fromEntries(roles.map(n => ['--' + slug(n), resolve(mode(val(T.colors[n]), i), i)]));
expected.brand = Object.fromEntries(roles.map(n => ['--' + slug(n), resolve(mode(val(T.colors[n]), 0), 0, 1)]));

const groups = { surface: [], label: [], outline: [], chart: [], shadow: [] };
for (const n of roles) { if (n.startsWith('root/')) continue; const g = n.split('/')[0]; (groups[g] ||= []).push(n); }
const GROUP_TITLE = { surface: 'Поверхности · surface', label: 'Текст и иконки · label', outline: 'Границы · outline', chart: 'Графики · chart', shadow: 'Цвета теней · shadow' };
const MODES = [['Light', 'data-theme="light"'], ['Dark', 'data-theme="dark"'], ['Light · contrast', 'data-theme="light" data-contrast="more"'], ['Dark · contrast', 'data-theme="dark" data-contrast="more"']];

const colorRows = Object.entries(groups).map(([g, list]) => `
  <h3 class="text-web-headline">${GROUP_TITLE[g] || g}</h3>
  <div class="ctable" role="table">
    <div class="crow head" role="row"><span role="columnheader">Роль</span>${MODES.map(m => `<span role="columnheader">${m[0]}</span>`).join('')}</div>
    ${list.map(n => {
      const desc = typeof T.colors[n] === 'object' && !Array.isArray(T.colors[n]) && T.colors[n].desc ? `<small>${T.colors[n].desc}</small>` : '';
      return `<div class="crow" role="row"><span class="cname"><code>--${slug(n)}</code>${desc}</span>${MODES.map((m, i) => `<span class="cell" ${m[1]}><i class="sw" style="background:var(--${slug(n)})"></i><code class="hex">${expected[i]['--' + slug(n)]}</code></span>`).join('')}</div>`;
    }).join('')}
  </div>`).join('');

const textRows = Object.entries(T.text).map(([n, s]) => `
  <div class="trow"><div class="tmeta"><code>.text-${slug(n)}</code><small>${s.font} ${s.weight} · ${s.size}/${s.lineHeight} · ${s.tracking}${s.case ? ' · UPPER' : ''}</small></div>
  <div class="text-${slug(n)} tsample">${n.startsWith('mono') ? '09:40 · 1 104 · ID 48213' : n.includes('caption') || n.includes('overline') ? 'Опоздание 40 мин' : 'Объяснительная за опоздание'}</div></div>`).join('');

const spaceRows = Object.entries(T.space).sort((a, b) => val(a[1]) - val(b[1])).map(([n, e]) => `<div class="srow"><code>--${slug(n)}</code><i style="width:var(--${slug(n)})"></i><span class="text-mono-caption-1">${val(e)}</span></div>`).join('');
const radiusRows = Object.entries(T.radius).map(([n, e]) => `<div class="rbox"><i style="border-radius:var(--${slug(n)})"></i><code>--${slug(n)}</code><span class="text-mono-caption-1">${val(e)}</span></div>`).join('');
const sizeRows = Object.entries(T.size).map(([n, e]) => `<div class="rbox"><i style="width:var(--${slug(n)});height:var(--${slug(n)});border-radius:var(--radius-s)"></i><code>--${slug(n)}</code><span class="text-mono-caption-1">${val(e)}</span></div>`).join('');
const shadowRows = Object.entries(T.effects).filter(([n]) => n.startsWith('shadow') || n.startsWith('focus')).map(([n, e]) => `<div class="shbox"><i style="box-shadow:var(--${slug(n)})"></i><code>--${slug(n)}</code><small>${e.desc}</small></div>`).join('');
const motionRows = Object.entries(T.motion).map(([n, e]) => `<div class="mrow"><code>--${slug(n)}</code><span class="text-mono-caption-1">${val(e)}${n.startsWith('duration') ? ' ms' : ''}</span><small>${e.desc}</small></div>`).join('');
const layerRows = Object.entries(T.layer).map(([n, e]) => `<div class="mrow"><code>--${slug(n)}</code><span class="text-mono-caption-1">${val(e)}</span><small>${e.desc.replace('Порядок слоя (z-index). ', '')}</small></div>`).join('');
const layoutRows = Object.entries(T.layout).map(([n, e]) => `<div class="mrow"><code>--${slug(n)}</code><span class="text-mono-caption-1">${[].concat(val(e)).join(' / ')}</span><small>${e.desc}</small></div>`).join('');

const html = `<meta charset="utf-8">
<title>One Flow DS v2 · токены</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap">
<style>
${tokensCss}
${typoCss}
/* доска: только токены DS */
html { scrollbar-gutter: stable; }
body { margin: 0; background: var(--surface-page); color: var(--label-primary); font: var(--text-web-body); }
.page { max-width: var(--content-max-width); margin: 0 auto; padding-block: var(--space-40) var(--space-64);
  padding-left: max(var(--space-16), env(safe-area-inset-left, 0px)); padding-right: max(var(--space-16), env(safe-area-inset-right, 0px));
  display: flex; flex-direction: column; gap: var(--space-24); }
header.top { display: flex; flex-wrap: wrap; gap: var(--space-16); align-items: flex-end; justify-content: space-between; }
header.top p { margin: var(--space-4) 0 0; color: var(--label-secondary); }
.test { display: inline-flex; align-items: center; gap: var(--space-8); padding: var(--space-6) var(--space-12); border-radius: var(--radius-full); font: var(--text-web-subheadline-medium); }
.test.ok { background: var(--surface-success-subtle); color: var(--label-success); }
.test.bad { background: var(--surface-danger-subtle); color: var(--label-danger); }
.test svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.theme { display: inline-flex; gap: var(--space-2); padding: var(--space-2); border-radius: var(--radius-full); background: var(--surface-neutral-default); }
.theme button { border: 0; background: none; color: var(--label-secondary); font: var(--text-web-subheadline-medium); height: var(--control-s); padding: 0 var(--space-12); border-radius: var(--radius-full); cursor: pointer; transition: background var(--duration-quick) var(--easing-standard); }
.theme button[aria-pressed="true"] { background: var(--surface-segmented-thumb); color: var(--label-primary); box-shadow: var(--shadow-xs); }
section.card { background: var(--surface-default); border-radius: var(--radius-xl); padding: var(--space-24); min-width: 0; }
section.card > h2 { margin: 0 0 var(--space-4); }
section.card > p { margin: 0 0 var(--space-16); color: var(--label-secondary); font: var(--text-web-callout); }
h3 { margin: var(--space-24) 0 var(--space-8); }
code { font: var(--text-mono-caption-1); color: var(--label-primary); }
small { display: block; font: var(--text-web-footnote); color: var(--label-tertiary); }
.scroll { overflow-x: auto; }
.ctable { display: grid; min-width: 760px; border: 1px solid var(--outline-subtle); border-radius: var(--radius-l); overflow: hidden; }
.crow { display: grid; grid-template-columns: minmax(220px, 1.4fr) repeat(4, minmax(120px, 1fr)); }
.crow + .crow { border-top: 1px solid var(--outline-subtle); }
.crow.head span { font: var(--text-web-caption-1); color: var(--label-secondary); padding: var(--space-8) var(--space-12); background: var(--surface-neutral-default); }
.cname { padding: var(--space-10) var(--space-12); min-width: 0; }
.cname small { margin-top: var(--space-2); }
.cell { display: flex; align-items: center; gap: var(--space-8); padding: var(--space-10) var(--space-12); background: var(--surface-default); color: var(--label-primary); }
.sw { width: 28px; height: 28px; flex: none; border-radius: var(--radius-s); box-shadow: inset 0 0 0 1px var(--outline-subtle); background-clip: padding-box; }
.cell .hex { color: var(--label-secondary); }
.trow { display: grid; grid-template-columns: minmax(200px, 260px) minmax(0, 1fr); gap: var(--space-16); align-items: baseline; padding: var(--space-12) 0; border-top: 1px solid var(--outline-subtle); }
.tsample { min-width: 0; overflow-wrap: anywhere; }
.srow { display: grid; grid-template-columns: 110px 1fr 40px; gap: var(--space-12); align-items: center; padding: var(--space-4) 0; }
.srow i { display: block; height: var(--space-12); background: var(--surface-brand-brand); border-radius: var(--radius-xs); }
.grid { display: flex; flex-wrap: wrap; gap: var(--space-16); }
.rbox { display: flex; flex-direction: column; gap: var(--space-6); align-items: flex-start; min-width: 96px; }
.rbox i { display: block; width: 72px; height: 72px; background: var(--surface-brand-subtle-default); box-shadow: inset 0 0 0 1.5px var(--outline-brand); }
.shbox { flex: 1 1 180px; display: flex; flex-direction: column; gap: var(--space-8); padding: var(--space-16); border-radius: var(--radius-l); background: var(--surface-page); }
.shbox i { display: block; height: 64px; border-radius: var(--radius-l); background: var(--surface-elevated); margin-bottom: var(--space-8); }
.mrow { display: grid; grid-template-columns: minmax(180px, 220px) 120px minmax(0, 1fr); gap: var(--space-12); align-items: baseline; padding: var(--space-8) 0; border-top: 1px solid var(--outline-subtle); }
.mrow small { margin: 0; }
.cols2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-16); }
@media (max-width: 639px) {
  .trow, .mrow { grid-template-columns: 1fr; gap: var(--space-4); }
  section.card { padding: var(--space-16); border-radius: var(--radius-l); }
}
@media (prefers-reduced-motion: reduce) { * { transition-duration: 0ms !important; } }
</style>

<div class="page">
  <header class="top">
    <div>
      <div class="text-web-overline" style="color:var(--label-brand-brand)">One Flow · DS v2</div>
      <h1 class="text-web-title-1" style="margin:var(--space-4) 0 0">Токены и шрифты</h1>
      <p class="text-web-callout">Выгрузка из Figma «design systems v2», ${T.meta.exported}. Всё на этой странице нарисовано только этими токенами.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:var(--space-8);align-items:flex-end">
      <span class="test" id="test">Проверка…</span>
      <div class="theme" role="group" aria-label="Тема">
        <button data-t="system" aria-pressed="true">Как в системе</button><button data-t="light" aria-pressed="false">Светлая</button><button data-t="dark" aria-pressed="false">Тёмная</button><button data-t="contrast" aria-pressed="false">Контраст</button>
      </div>
    </div>
  </header>

  <section class="card">
    <h2 class="text-web-title-3">Цвета — роли коллекции colors</h2>
    <p>Четыре режима рядом: каждая колонка — остров с data-theme, значения посчитаны из tokens.json. В макетах и коде — только роли, шкалы palette напрямую не используются.</p>
    <div class="scroll">${colorRows}</div>
  </section>

  <section class="card">
    <h2 class="text-web-title-3">Текстовые стили</h2>
    <p>Onest — всё, что читают; JetBrains Mono — цифры, время, ID. Абзац не меньше 16 px.</p>
    ${textRows}
  </section>

  <div class="cols2">
    <section class="card"><h2 class="text-web-title-3">Отступы · space</h2><p>Сетка 8 px; 2, 4, 6, 10 — только внутри компонентов.</p>${spaceRows}</section>
    <section class="card"><h2 class="text-web-title-3">Радиусы и размеры</h2><p>Радиусы 4 · 8 · 12 · 16 · 24 · полный. Контролы 24–52, иконки 16 / 20 / 24.</p><div class="grid">${radiusRows}</div><h3 class="text-web-headline">size</h3><div class="grid">${sizeRows}</div></section>
  </div>

  <section class="card"><h2 class="text-web-title-3">Тени и фокус</h2><p>Цвет теней — роли shadow/key и shadow/ambient, в тёмной теме они темнее.</p><div class="grid">${shadowRows}</div></section>

  <div class="cols2">
    <section class="card"><h2 class="text-web-title-3">Движение · motion</h2>${motionRows}</section>
    <section class="card"><h2 class="text-web-title-3">Слои · layer</h2>${layerRows}</section>
  </div>
  <section class="card"><h2 class="text-web-title-3">Каркас · layout</h2><p>Desktop / Tablet / Mobile.</p>${layoutRows}</section>
</div>

<script>
const EXPECTED = ${JSON.stringify(expected)};
const MODES = [[{theme:'light'}, 0], [{theme:'dark'}, 1], [{theme:'light', contrast:'more'}, 2], [{theme:'dark', contrast:'more'}, 3], [{theme:'light', brand:'client-example'}, 'brand']];
const de = document.documentElement;
function apply(a) { for (const k of ['theme','contrast','brand']) { if (a[k]) de.setAttribute('data-' + k, a[k]); else de.removeAttribute('data-' + k); } }
function norm(v) { v = v.trim().toLowerCase(); return v; }
function run() {
  const saved = { theme: de.getAttribute('data-theme'), contrast: de.getAttribute('data-contrast'), brand: de.getAttribute('data-brand') };
  const fails = []; let checked = 0;
  for (const [attrs, key] of MODES) {
    apply(attrs); const cs = getComputedStyle(de);
    for (const [name, exp] of Object.entries(EXPECTED[key])) { checked++; const got = norm(cs.getPropertyValue(name)); if (got !== exp.toLowerCase()) fails.push({ mode: key, name, exp, got }); }
  }
  apply(saved);
  window.__tokenTest = { checked, fails };
  const el = document.getElementById('test');
  el.className = 'test ' + (fails.length ? 'bad' : 'ok');
  el.innerHTML = (fails.length ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16v.01"/></svg>' : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16 10"/></svg>') +
    (fails.length ? 'Не совпало: ' + fails.length + ' из ' + checked : 'Совпадает с Figma: ' + checked + ' значений в 5 режимах');
}
document.querySelectorAll('.theme button').forEach(b => b.onclick = () => {
  const t = b.dataset.t;
  de.removeAttribute('data-contrast');
  if (t === 'system') de.removeAttribute('data-theme');
  else if (t === 'contrast') { de.setAttribute('data-theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); de.setAttribute('data-contrast', 'more'); }
  else de.setAttribute('data-theme', t);
  document.querySelectorAll('.theme button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
});
run();
</script>
`;
writeFileSync(join(root, 'assets/preview.html'), html);
console.log('preview.html', html.length, 'roles', roles.length);
