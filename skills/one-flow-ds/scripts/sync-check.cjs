// Сверка DS v2 с китом плагина по отпечатку (только для владельца DS, в Claude Code).
// 1. В use_figma запустить scripts/fingerprint.figma.js — он вернёт { marker, sets }.
// 2. node scripts/sync-check.cjs <журнал сессии .jsonl> <marker>          → что изменилось с прошлой сборки плагина
//    node scripts/sync-check.cjs <журнал сессии .jsonl> <marker> --save   → записать отпечаток как новую точку отсчёта
// Журнал сессии: ~/.claude/projects/<проект>/<id сессии>.jsonl. Точка отсчёта — references/figma-fingerprint.json.
// Токены и иконки сверяются отдельно: scripts/export-tokens.figma.js (хэш = tokensHash) и scripts/export-icons.figma.js.
const fs = require('fs'), path = require('path');
const [, , log, marker, flag] = process.argv;
const BASE = path.join(__dirname, '..', 'references', 'figma-fingerprint.json');
let found = null;
for (const l of fs.readFileSync(log, 'utf8').split('\n')) {
  if (!l.includes(marker)) continue; let o; try { o = JSON.parse(l); } catch { continue; }
  for (const b of (o.message && o.message.content) || []) if (b.type === 'tool_result') {
    const t = Array.isArray(b.content) ? b.content.map(x => x.text || '').join('') : String(b.content);
    if (t.includes('"marker":"' + marker + '"')) found = JSON.parse(t.slice(t.indexOf('{')));
  }
}
if (!found) { console.log('Результат с маркером ' + marker + ' не найден в журнале'); process.exit(1); }
const base = fs.existsSync(BASE) ? JSON.parse(fs.readFileSync(BASE, 'utf8')) : { sets: {} };
const now = found.sets, old = base.sets || {};
const changed = [], added = [], removed = [];
for (const [id, [page, name, h]] of Object.entries(now)) { if (!old[id]) added.push(page + ' · ' + name + ' ' + id); else if (old[id][2] !== h) changed.push(page + ' · ' + name + ' ' + id); }
for (const [id, [page, name]] of Object.entries(old)) if (!now[id]) removed.push(page + ' · ' + name + ' ' + id);
console.log('Отпечаток Figma: ' + Object.keys(now).length + ' компонентов (' + found.at + '); в плагине: ' + Object.keys(old).length + ' (' + (base.at || '—') + ')');
console.log('Изменились (' + changed.length + '):' + (changed.length ? '\n  ' + changed.join('\n  ') : ' нет'));
console.log('Новые (' + added.length + '):' + (added.length ? '\n  ' + added.join('\n  ') : ' нет'));
console.log('Удалены (' + removed.length + '):' + (removed.length ? '\n  ' + removed.join('\n  ') : ' нет'));
if (flag === '--save') {
  const out = Object.assign({}, base, { at: found.at, sets: now });
  fs.writeFileSync(BASE, JSON.stringify(out, null, 1));
  console.log('Записано: ' + path.relative(process.cwd(), BASE));
}
