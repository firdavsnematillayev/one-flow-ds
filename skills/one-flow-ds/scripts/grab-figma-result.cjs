// Забирает результат use_figma из журнала сессии Claude Code без перепечатки и сверяет хэш FNV-1a.
// Скрипт в Figma возвращает { marker, hash, len, <данные> } — данные под любым ключом (icons, logos…), хэш считается по ним. Запуск: node scripts/grab-figma-result.cjs ~/.claude/projects/<проект>/<сессия>.jsonl <MARKER> out.json
const fs = require('fs');
const [,, file, marker, out] = process.argv;
const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
let found = null;
for (const l of lines) {
  if (!l.includes(marker)) continue;
  let o; try { o = JSON.parse(l); } catch { continue; }
  const c = o.message && o.message.content; if (!Array.isArray(c)) continue;
  for (const b of c) if (b.type === 'tool_result') {
    const parts = Array.isArray(b.content) ? b.content : [{ type: 'text', text: b.content }];
    for (const p of parts) if (p.type === 'text' && p.text.includes('"marker":"' + marker + '"')) found = p.text;
  }
}
if (!found) { console.log('not found'); process.exit(1); }
const j = JSON.parse(found.slice(found.indexOf('{')));
const key = Object.keys(j).find(k => !['marker', 'hash', 'len', 'rebuilt', 'missing'].includes(k));
const s = JSON.stringify(j[key]); let h = 0x811c9dc5;
for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
console.log(marker, 'figma', j.hash, j.len, 'local', h.toString(16), s.length, h.toString(16) === j.hash ? 'OK' : 'MISMATCH', key, Object.keys(j[key]).length);
if (h.toString(16) === j.hash) fs.writeFileSync(out, s);
