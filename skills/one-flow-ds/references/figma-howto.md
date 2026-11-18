# Работа с DS v2 через коннектор Figma

Ключи:
- файл библиотеки: `tlHFo5v7I0fXFxtlAApApw`
- библиотека design systems v2: `lk-9219e9b39fe750262fb0169341292b23214ac79453c3edc32de917a5b6974ef84ad61d4460bb23fb1496ea1238857c0960d7fc1fc0e45b0cbbfc5a8f00d36c57`
- библиотека иконок Icons OneFlow: `lk-f727b28a48b52332d81194736ef552c524480c6424f0f0a032e9077a22845de8050451ab4f4ac565b854d5f50a6df1d50556212ba6676ce15321179f5ffd8b32`

## Порядок

1. Если в сессии есть навыки `figma-use` (и `figma-generate-design` для экранов) — загрузить их перед первым `use_figma`.
2. `get_libraries` для рабочего файла: проверить, что design systems v2 подключена. Если нет — попросить пользователя подключить библиотеку в файле (Assets → Libraries), сами не подключаем.
3. Найти нужное: `search_design_system` с `includeLibraryKeys: [<ключ DS v2>]` (для иконок — ключ иконок). Сущности: `component`, `variable`, `style`. Описание компонента в результате — его правила.
4. Собирать через `use_figma` по частям (секция за секцией), после каждой части — `get_screenshot`.
5. Не трогать файл библиотеки, если пользователь не владелец DS и не просил.

## Фрагменты для use_figma

Экземпляр компонента из библиотеки:
```js
const set = await figma.importComponentSetByKeyAsync('<componentSetKey>');
const variant = set.children.find(c => c.name === 'style=primary, size=m, state=default, shape=round');
const inst = variant.createInstance();
parent.appendChild(inst);
// свойства: имена с суффиксом #id — искать по началу имени
const set1 = (i, obj) => { const m = {}; for (const k of Object.keys(i.componentProperties)) { const n = k.split('#')[0]; if (n in obj) m[k] = obj[n]; } i.setProperties(m); };
set1(inst, { Label: 'Сохранить изменения' });
```

Цвет токеном (роль из `colors`):
```js
const v = await figma.variables.importVariableByKeyAsync('<variable key>');
node.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v)];
```

Отступ, радиус токеном:
```js
const gap = await figma.variables.importVariableByKeyAsync('<key space/16>');
frame.setBoundVariable('itemSpacing', gap);
for (const k of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']) frame.setBoundVariable(k, radiusVar);
```

Текстовый стиль:
```js
const st = await figma.importStyleByKeyAsync('<style key web/body>');
await figma.loadFontAsync({ family: 'Onest', style: 'Regular' });
text.characters = '…';
await text.setTextStyleIdAsync(st.id);
```

Тёмная тема и бренд клиента на фрейме (для проверки):
```js
const colors = /* коллекция colors из библиотеки */ (await figma.variables.getVariableCollectionByIdAsync(someColorVar.variableCollectionId));
frame.setExplicitVariableModeForCollection(colors, colors.modes.find(m => m.name === 'Dark').modeId);
```
Для удалённой (библиотечной) коллекции режим выставляется так же; коллекцию берём через любую импортированную переменную (`variable.variableCollectionId`). Проверку тёмной темы делать на копии фрейма рядом, а не на оригинале.

Стиль анимации: панель Animation → группа Motion; программно — `node.applyAnimationStyle(styleId, { type: 'CUSTOM', timelineOffset })` (нужен навык `figma-use-motion`).

## Прочитать доску правил текстом

Работает только при доступе на редактирование к файлу библиотеки. Без него — `get_design_context` / `get_screenshot` по id из `rules-index.md`.
```js
// файл tlHFo5v7I0fXFxtlAApApw, только чтение
const node = await figma.getNodeByIdAsync('<id доски>');
const texts = node.findAll(n => n.type === 'TEXT').map(t => t.characters);
return texts.join('\n');
```

## Проверка макета

Скрипт `scripts/lint.js` — вставить его текст в `use_figma` рабочего файла, вписать `TARGET` (id фрейма) и запустить. Он только читает. Уровни: `error` — нарушает главные правила, `warning` — стоит исправить, `info` — к сведению. В самом файле библиотеки замечания «локальный компонент» нормальны — их игнорировать.

Скрипт не проверяет: контраст, тёмную тему, тексты, смысл и логику — это делается глазами по скриншоту и правилам.
