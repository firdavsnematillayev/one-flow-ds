// Иконки Icons OneFlow → SVG для кода (только чтение). Запуск: use_figma в файле 2hQBxCgrpDogWTTJJ4oP5C (источник — сама библиотека, не копии в DS v2).
// Вписать WANT — ключи «<имя>/<line|solid>-<24|20|16>». Возвращает { marker, hash, rebuilt, icons }:
// SVG как в Figma, цвет заменён на currentColor (иконка берёт цвет текста рядом, правило DS).
// Проверка частей: если в выгрузке меньше подпутей, чем в векторе (так теряется точка у dots — лишние области в векторной сети),
// иконка собирается заново из vectorPaths с той же обводкой — список в rebuilt. Если совпадение по форме, но выгрузка склеила
// отрезки (corner-down-right, door-enter), пересборка тоже верна — просто точнее.
// Перенос без перепечатки: node scripts/grab-figma-result.cjs <журнал сессии .jsonl> <marker> out.json (сверяет хэш),
// затем дописать в assets/icons.json и пересобрать: node scripts/build-icons.mjs (и --hash).
const WANT = ['chevron-down/line-20', 'check/line-16'];
const MARKER = 'ICONS-' + Date.now();

const byName = {};
for (const p of figma.root.children) { await p.loadAsync(); for (const s of p.findAllWithCriteria({ types: ['COMPONENT_SET'] })) if (!byName[s.name]) byName[s.name] = s; }
const r4 = x => Math.round(x * 10000) / 10000;
const icons = {}, rebuilt = [], missing = [];
for (const k of WANT) {
  const [n, v] = k.split('/'); const [st, sz] = v.split('-');
  const set = byName['icon/' + n]; const c = set && set.children.find(x => x.name === 'style=' + st + ', size=' + sz);
  if (!c) { missing.push(k); continue; }
  let svg = await c.exportAsync({ format: 'SVG_STRING' });
  svg = svg.replace(/(fill|stroke)="(?!none)[^"]*"/g, '$1="currentColor"').replace(/\s*xmlns="[^"]*"/, '').replace(/\n/g, '');
  const vecs = c.findAll(x => x.type === 'VECTOR');
  const want = vecs.reduce((a, x) => a + x.vectorPaths.reduce((b, p) => b + (p.data.match(/M/g) || []).length, 0), 0);
  const got = (svg.match(/ d="[^"]*"/g) || []).reduce((a, d) => a + (d.match(/M/g) || []).length, 0);
  if (got < want) {
    const size = +sz;
    svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" fill="none">' + vecs.map(x => {
      const d = x.vectorPaths.map(p => p.data).join(' ');
      const stroke = x.strokes.length ? ' stroke="currentColor"' + (x.strokeWeight !== 1 ? ' stroke-width="' + x.strokeWeight + '"' : '') + ' stroke-linecap="' + (x.strokeCap === 'ROUND' ? 'round' : 'butt') + '" stroke-linejoin="' + (x.strokeJoin === 'ROUND' ? 'round' : 'miter') + '"' : '';
      const fill = x.fills.length && !x.strokes.length ? ' fill="currentColor"' + (x.vectorPaths[0].windingRule === 'EVENODD' ? ' fill-rule="evenodd"' : '') : '';
      return '<path transform="translate(' + r4(x.x) + ' ' + r4(x.y) + ')" d="' + d + '"' + fill + stroke + '/>';
    }).join('') + '</svg>';
    rebuilt.push(k + ' ' + got + '/' + want);
  }
  icons[k] = svg;
}
const s = JSON.stringify(icons); let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
return { marker: MARKER, hash: h.toString(16), len: s.length, rebuilt, missing, icons };
