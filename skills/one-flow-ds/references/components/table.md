# table — таблица и её части

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `table`, 2026-11-17. Код: `.of-table-card`, `.of-table` (+ `.of-table--selectable`, `data-size="s"`), `.of-table-toolbar`, `.of-table-footer`, `.of-table-bulk`, `.of-table-resize-guide` в `assets/components.css`. Подробные правила в Figma — фрейм `Specs / table and filters` `782:4907`.

## Карточка `table` `746:1421`
Отступы `space/24`, gap 16, `radius/xl`, `surface/default`: `[table-toolbar] [строки] [table-footer]`. Лежит на сером фоне страницы.

## table-header-row `746:1338` · table-header-cell `744:360` · table-header-index `769:3431`
- Шапка: высота 40, `surface/neutral/default`, `radius/m`.
- Ячейка: отступы `0 space/12`, gap 4, Label `web/subheadline-medium` `label/secondary`; иконка сортировки 16 (`chevron-down` / `chevron-up`) `label/tertiary`, видна при наведении. sort asc / desc — Label и иконка `label/primary`. align right — для чисел.
- hover — Label `label/primary`, у правого края ручка 2 × 16 `outline/default`; resizing — линия 2 на всю высоту `outline/brand`; dragging — `radius/s`, `surface/elevated`, `shadow/md`, слева `grip-vertical` 16.
- Колонка номера: 48, «№» `web/subheadline-medium` `label/secondary`; hover — флажок; some-selected — флажок indeterminate; all-selected — отмечен.

## table-row `746:1337` · table-cell `744:438` · table-index-cell `769:3414`
- Строка: m 56 / s 44, линия снизу 1 px `outline/subtle`; hover `surface/neutral/default`; selected `surface/brand-subtle/default`.
- Ячейка: отступы `0 space/12`, gap 4; m — `web/body` `label/primary`, s — `web/subheadline`; длинное — многоточие. Типы: text · two-line (+ описание `web/subheadline` `label/secondary`) · number (вправо) · user (user m) · status · badge (badge m) · checkbox (48) · actions (56, icon-button ghost s round, `dots`) · button (button neutral s).
- Номер строки: 48, `mono/subheadline` `label/tertiary`; hover / focus — флажок; selected — отмеченный флажок.

## Группировка: table-group-row `769:3493` · table-more-row `772:4564`
- Заголовок группы: высота 44, линия снизу; `[48: флажок (появляется как у номера)] [chevron 20 вниз / вправо] [status, скрыт] [название web/body-medium] [число web/subheadline label/tertiary]`, gap 8, справа 12.
- «Показать ещё»: высота 44, отступ слева 60: link brand sm (в коде — `<button type="button" class="of-link">`, это действие на месте) + «N осталось» `web/subheadline` `label/tertiary`.

## table-toolbar `746:1376` · table-bulk-bar `746:1400` · table-footer `755:2078` · page-size-menu `755:2107`
- Панель: `[filter-bar] [button neutral m «Группировать» (stack-2)] [button primary m]`, gap 12. Главная кнопка необязательна (описание компонента): если это действие уже есть в page-header, в панели его не повторяем (вопрос 23).
- Выбранные строки: пилюля `surface/inverse`, тень `shadow/lg`, отступы 8 8 8 20, gap 8: «Выбрано 3» `web/subheadline-medium` `label/inverse`, button neutral s round, button danger s round, крестик ghost s (`label/inverse`). По описанию компонента — висит внизу по центру таблицы; на доске правил — «вместо панели фильтров» (вопрос 20). В коде — внизу по центру: последний ребёнок `.of-table-card`, `position: sticky`.
- Футер: между краями, gap 16: «1–10 из 48» и «Строк на странице» `web/subheadline` `label/secondary` + button neutral s (число + chevron-down 20 `label/secondary`); справа pagination. Меню размера — 10 / 20 / 50 / 100 (select-option, ширина 104).
- Линия ширины (table-resize-guide `1175:5961`): 2 px `outline/brand` + пилюля `surface/inverse` с шириной `mono/caption-1-medium` `label/inverse`.

## Состояния таблицы
- loading `775:4743` — шапка и панель на месте, строки — table-skeleton-row (те же колонки и высота; skeleton text / avatar / title).
- empty `775:4961` — empty-state внутри карточки: «Ничего не найдено» + «Сбросить фильтры»; панель и шапка остаются.
- error `783:5263` — что не загрузилось + «Повторить».
- grouped `772:4605` — страницы считают группы (10 на страницу), в группе первые 10 строк, номера идут через все группы.

## Правила (доска «table rules (DS2)» `1211:473`)
- Таблица в белой карточке на сером фоне; над ней панель фильтров, под ней футер с пагинацией.
- m 56 — основная высота, кнопки s 32; s 44 — плотные таблицы, кнопки xs 24.
- Первая колонка — номер строки (позиция в текущем виде, не ID); при наведении — флажок, если роль может выбирать. Выбраны строки — вместо панели фильтров table-bulk-bar.
- Одна кнопка «Ещё» (горизонтальное троеточие) в последней колонке; строка целиком нажимается, если у объекта есть своя страница.
- Текст — влево, числа и суммы — вправо, JetBrains Mono. Сортировка — по нажатию на заголовок. Широкая таблица: №, главная колонка и «Ещё» закреплены, шапка закреплена при прокрутке.
- Группировка: 10 групп на страницу, в группе первые 10 строк и «Показать ещё N», у заголовка группы флажок.
- Состояния: loading — скелетон строк; empty — empty-state; error — «Повторить».

## Разметка
Полная разметка — в комментарии к блоку `table` в `components.css`: карточка, панель, прокрутка `.of-table-scroll`, таблица, футер, панель выбранных строк. Ячейка с числом — `<td data-align="right">`, заголовок с сортировкой — `<th aria-sort="ascending|descending">`.

Выбор строк (только у `.of-table--selectable`):
- флажки — `<input type="checkbox" class="of-checkbox">`; выбранная строка — `<tr aria-selected="true">` и флажок `checked`;
- выбрана часть строк — `<thead data-selection="some">` и у флажка шапки `el.indeterminate = true`; все — `data-selection="all"` и `checked`;
- пока что-то выбрано, в карточке есть `.of-table-bulk`, снят выбор — `hidden`.

Колонка с датой — обычная текстовая ячейка (`web/body`), даты в формате «17.11.2026» или «17 нояб.».

## Расхождения в Figma
1. **Числа в таблице** набраны `web/body`, доска правил требует JetBrains Mono (вопрос 19). В коде — как в компоненте: `web/body` и цифры одной ширины (`tabular-nums`).
2. Отступы и промежутки: gap 4 в ячейках, 8 / 12 в заголовке группы, 60 у «Показать ещё», 8 8 8 20 у панели выбранных строк — числами, не токенами.
3. Ручка ширины колонки 2 × 16 и линия 2 px — числами.
4. **Наведение на крестик панели выбранных строк** не нарисовано. Серый фон ghost на тёмной панели прятал белый крестик (1.11:1), в коде — `surface/glass/neutral`: 12.0:1 в светлой теме, 7.4:1 в тёмной.
