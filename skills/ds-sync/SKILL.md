---
name: ds-sync
description: >
  This skill should be used by the owner of the One Flow design system when they say "обнови плагин",
  "синхронизируй плагин с Figma", "я поменял дизайн-систему", "проверь, что плагин совпадает с Figma",
  "выпусти новую версию плагина", "sync the plugin with Figma", "update the DS plugin". It checks DS v2 in Figma
  against the plugin's kit by fingerprint, carries every change into the plugin, verifies it and releases a new version.
  Needs Claude Code with the plugin source folder and edit access to the Figma files.
metadata:
  version: "0.3.2"
---

# Обновить плагин по Figma

Только для владельца DS. Нужны: Claude Code, папка с исходниками плагина (где `.claude-plugin/plugin.json`), доступ на редактирование к файлам DS v2 (`tlHFo5v7I0fXFxtlAApApw`) и Icons OneFlow (`2hQBxCgrpDogWTTJJ4oP5C`), навык `figma-use`. Пути ниже — от `skills/one-flow-ds/`.

Перенос результатов `use_figma` в файлы — только из журнала сессии, без перепечатки: `scripts/grab-figma-result.cjs` и `scripts/sync-check.cjs` сверяют хэш.

## 1. Найти, что изменилось

Все вызовы — только чтение.

1. **Токены и стили**: `scripts/export-tokens.figma.js`. Хэш должен совпасть с `tokensHash` в `references/figma-fingerprint.json`.
   - Перед запуском поставь в скрипте `exported` = дата из `references/tokens.json`, иначе хэш разойдётся из-за даты.
2. **Иконки**: `scripts/export-icons.figma.js`, в `WANT` — все ключи из `assets/icons.json`. Сравни хэш каждой SVG с `icons` в отпечатке и верни только отличающиеся.
3. **Компоненты и доски правил**: `scripts/fingerprint.figma.js` (около 40 с), затем:
   ```bash
   node scripts/sync-check.cjs <журнал .jsonl> <marker>
   ```
   Скрипт покажет, какие компоненты и доски правил изменились, какие появились и какие удалены.
4. Ничего не изменилось — так и сказать владельцу. Версию не поднимать.

## 2. Перенести изменения

- **Токены**: записать `json` в `references/tokens.json`, затем `node scripts/build-tokens.mjs` и `node scripts/build-preview.mjs`.
- **Иконки**: выгрузку (`grab-figma-result.cjs`) дописать в `assets/icons.json`, затем `node scripts/build-icons.mjs` и `node scripts/build-icons.mjs --hash`.
- **Компонент изменился или появился**:
  1. `scripts/export-components.figma.js` с его id → обновить `references/components/<страница>.md` (анатомия, токены по состояниям, расхождения).
  2. Обновить блок в `assets/components.css`.
  3. Обновить образцы и проверки в `scripts/build-components-preview.mjs`.
- **Доска правил изменилась**: прочитать её текст (`figma-howto.md`, «Прочитать доску правил текстом») и обновить раздел «Правила» в `<страница>.md`.
- **Компонент удалён**: убрать его из `.md`, CSS и образцов; записать в `references/decisions.md`.
- Каждую правку записать в `references/decisions.md`: дата, что было, что стало, где.

## 3. Проверить

1. `node scripts/build-components-preview.mjs`, открыть доску через локальный сервер:
   ```bash
   python3 -m http.server --directory assets
   ```
   - Окно не уже 1280 px.
   - Вверху должно быть «Совпадает с Figma: N образцов × 2 темы».
2. Изменённые компоненты проверить глазами в светлой и тёмной теме.
3. `claude plugin validate .` — без ошибок.

## 4. Выпустить

1. Поднять версию в `.claude-plugin/plugin.json` и в `metadata.version` всех `skills/*/SKILL.md`:
   - новый компонент или правило — вторая цифра (0.3.0 → 0.4.0);
   - исправление — третья (0.3.0 → 0.3.1).

   Без новой версии участники обновление не получат.
2. Сохранить отпечаток как новую точку отсчёта:
   ```bash
   node scripts/sync-check.cjs <журнал> <marker> --save
   ```
   Если токены изменились, поправить `tokensHash`; хэши иконок пересчитать из `assets/icons.json`.
3. Собрать архив из корня папки плагина, без `.claude-plugin/marketplace.json`:
   ```bash
   zip -qr -X ../one-flow-ds.zip . -x '.claude-plugin/marketplace.json' -x '*.DS_Store'
   ```
   Копия того же архива — `one-flow-ds.plugin`.
4. **Отправить в репозиторий** `github.com/firdavsnematillayev/one-flow-ds` (открытый) — это и есть раздача. Из папки плагина:
   ```bash
   git add -A && git commit -m "One Flow DS <версия>: <что изменилось>" && git push
   ```
   В конце сообщения коммита — строка `Co-Authored-By: Claude …`, если её требуют правила сессии.
   - У коллег с автообновлением новая версия появится сама.
   - Проверить: `claude plugin marketplace update one-flow`, затем `claude plugin update one-flow-ds@one-flow` — должно написать новую версию.
   - Репозиторий открытый: всё, что в него попадает, видно всем. Не класть туда реальные данные сотрудников и клиентов, ключи и пароли.
5. Коротко отчитаться владельцу: что изменилось, новая версия, результат сверки.
