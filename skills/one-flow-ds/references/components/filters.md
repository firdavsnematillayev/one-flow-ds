# filters — filter-bar · filter-chip · filter-panel · filter-category · filter-option · filter-values

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `filters`, 2026-11-17. Код: `.of-filter-bar`, `.of-filter-chip`, `.of-filter-panel`, `.of-filter-group-title`, `.of-filter-category`, `.of-filter-option`, `.of-filter-values` в `assets/components.css`. Примеры в Figma: `.filters example / …` (pinned field, all filters, many filters, reset with undo, field menu, hidden filters).

## filter-bar `759:1729`
Столбец, gap 12. Строка управления (gap 8): search m round шириной 280 + button m «Фильтры» с иконкой `filter` 20.
state: default — кнопка neutral, больше ничего; active — кнопка tonal «Фильтры · N» и вторая строка: чипы applied (gap 8) + link «Сбросить» последним (в коде — `<button type="button" class="of-link">`: вид ссылки, но это действие); overflow — не помещается: чип «+3» перед «Сбросить». Строка не переносится.

## filter-chip `757:227`
Высота 32, `radius/full`, текст `web/subheadline-medium`.
- applied: отступы 0 4 0 12, gap 4, `surface/brand-subtle/default` (hover `…/hover`), текст `label/brand/on-subtle`, крестик 16 в зоне 24.
- preset: отступы 0 12, `surface/neutral/default`, `label/secondary`. more («+3»): отступы 0 10, то же.

## filter-panel `759:1647`
580, `radius/l`, `surface/elevated`, тень `shadow/lg`.
`[body: categories 236 (отступы space/8, gap 2, линия справа outline/subtle) | values] [footer: отступы 10 16, линия сверху outline/subtle — link «Сбросить всё» + «Найдено 11 из 48» web/subheadline label/secondary]`.
- filter-group-title `757:84`: отступы 10 12 4 12, `web/overline` `label/tertiary`.
- filter-category `757:104`: высота 36, отступы `0 space/12`, gap 8, `radius/s`; Label `web/subheadline` `label/primary`; counter brand s (сколько значений выбрано); `chevron-right` 16 `label/tertiary`. hover — `surface/elevated-hover`, появляются `grip-vertical` 16 `label/tertiary`, `pin` 16 и `dots` 16 `label/secondary`. selected — `surface/brand-subtle/default`, Label `web/subheadline-medium`, всё `label/brand/on-subtle`. pinned — `pin` solid `label/brand/brand`, поле наверху списка над разделителем.
- filter-values `759:1295`: отступы `space/8`, gap 4; шапка (отступы 6 8): название `web/subheadline-medium` + link «Очистить». kind list — filter-option; search — search m сверху; date — готовые периоды (select-option) + «С / По» (два input).
- filter-option `757:218`: высота 36, отступы 0 12 0 8, gap 8, `radius/s`: checkbox, [иконка 20 / avatar 24], Label `web/subheadline` `label/primary` (value=badge — badge s), «только» `web/caption-1` `label/brand/brand` (при наведении), число `web/subheadline` `label/tertiary`. hover и selected — `surface/elevated-hover`; disabled — всё `label/disabled`.

## Правила (доска «filters rules (DS2)» `1211:520`)
- Во всём продукте одна схема: поиск + «Фильтры». Отдельные выпадающие фильтры в одной панели с кнопкой «Фильтры» не ставим.
- Слева поиск, справа «Фильтры · N» (N — все активные). Когда что-то отфильтровано — строка чипов, каждый с крестиком, в конце «Сбросить»; не помещаются — «+3» перед «Сбросить».
- Окно: слева «Готовые» наборы, затем поля; справа значения выбранного поля. Значения применяются сразу. Значение без результатов — серое и недоступное, не скрыто. Длинный список — поиск сверху.
- Закрепление как в Telegram: закреплённое поле поднимается наверх, над разделителем. Порядок — перетаскиванием или через «…».
- «Сбросить» сразу очищает фильтры и показывает undo-toast на 5 секунд. Мобильный вид — позже (нижняя шторка).

## Расхождения в Figma
1. Отступы 10 / 12 / 4 у заголовка группы, 6 8 у шапки значений, 10 16 у футера, 0 4 0 12 и 0 10 у чипов — числами.
2. Число у значения (`label/tertiary`) на `surface/elevated-hover` было 4.30:1 — исправлено новым `neutral/550` (теперь 4.57:1, см. `decisions.md`).
