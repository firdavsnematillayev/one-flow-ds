#!/usr/bin/env node
// assets/icons.json → assets/icons.svg: спрайт <symbol id="i-<имя>-<line|solid>-<24|20|16>">.
// В странице: вставить содержимое icons.svg в начало <body> (скрыто), иконка — <svg class="of-icon"><use href="#i-plus-line-20"/></svg>.
// Новые иконки: scripts/export-icons.figma.js (файл Icons OneFlow) → дописать в icons.json → --hash сверить → пересобрать.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const icons = JSON.parse(readFileSync(join(root, 'assets/icons.json'), 'utf8'));
if (process.argv.includes('--hash')) {
  const s = JSON.stringify(icons); let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  console.log(h.toString(16), s.length); process.exit(0);
}
const symbols = Object.entries(icons).map(([k, svg]) => {
  const vb = svg.match(/viewBox="([^"]+)"/)[1];
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return `<symbol id="i-${k.replace('/', '-')}" viewBox="${vb}" fill="none">${inner}</symbol>`;
});
writeFileSync(join(root, 'assets/icons.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">\n${symbols.join('\n')}\n</svg>\n`);
console.log('icons.svg', symbols.length);
