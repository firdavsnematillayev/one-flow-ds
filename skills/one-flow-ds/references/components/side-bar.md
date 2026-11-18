# side-bar — side-bar · side-bar-item · side-bar-subitem · role-switch

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `side-bar`, 2026-11-17 (разделы с подпунктами — дорисованы в тот же день). Код: `.of-sidebar` (+ `data-mode="collapsed"`), `.of-sidebar-item`, `.of-sidebar-group`, `.of-sidebar-subitem`, `.of-sidebar-flyout`, `.of-role-switch` в `assets/components.css`. Specs — `Specs / side-bar` `1341:2873`, тёмное превью — `1341:1707`. Каркас страницы — `.app shell / side-bar expanded` `802:2273` и `collapsed` `802:2408`: nav-bar 82 сверху, side-bar 284 / 72 слева, контент на сером фоне. В коде — `.of-shell` (`code-screen.md`).

## side-bar `802:2272`
Свойства: `role` user · admin; `mode` expanded 284 · collapsed 72; `Show hide`, `Show role switch`, `Show my department`.
Столбец: отступы 16 12 20 12, gap 8, `surface/default`, линия справа 1 px `outline/subtle`. `[разделы, gap 8] [растяжка] [«Скрыть» — side-bar-item с layout-sidebar-left-collapse] [role-switch]`.
- Сотрудник: Главная (home-01), Структура (hierarchy-square-02), Посещаемость (clock-01), Формы (note-01), Моё подразделение (user-group) — только руководителю.
- Администратор: Мониторинг (activity-01), Главная, Аналитика (analytics-01), Кадровое дело (id-card), Плановый (clipboard-list-hg), Директория (book-02), Конфигурация (settings-02). Все иконки обеих ролей в спрайте — line 24 и solid 24 (solid нет только у `user-group`).

## side-bar-item `800:1935`
Высота 44, отступы `0 space/12`, gap 12, `radius/m`: иконка 24 + Label `web/body-medium` (цвет `label/secondary`) + counter danger m (только когда там ждут действия) + `chevron-down` 16 `label/tertiary` (раздел с подпунктами).
- hover — `surface/neutral/default`.
- active — `surface/brand-subtle/default`, Label `web/body-semibold`, текст и иконка `label/brand/on-subtle`, иконка **solid**; слева у края меню полоса 3 × 24 `surface/brand/brand`, скругление 0 3 3 0.
- collapsed — квадрат 44, только иконка, название — в подсказке (у раздела с подпунктами — side-bar-flyout).
- `open` false · true — раздел закрыт / открыт: `chevron-down` / `chevron-up` 16 (`Show chevron`). Сам раздел — не страница: нажатие открывает и закрывает его.
- active-child (только open=true) — раздел открыт, текущая страница — один из его подпунктов: Label `web/body-semibold` `label/primary`, иконка **solid** `label/brand/brand`, без фона и полосы (их получает подпункт). Раздел закрыт, а текущая страница внутри — сам раздел state=active.

## side-bar-subitem `800:1944`
Свойства: `mode` expanded · collapsed; `state` default · hover · active; `Show counter`.
- expanded — в меню: 260 × 36, отступы 0 12 0 48 (подпись на одной линии с названием раздела), gap 8, `radius/s`; Label `web/body` `label/secondary`; hover `surface/neutral/default`.
- active — текущая страница, те же отметки, что у активного пункта: `surface/brand-subtle/default`, Label `web/body-semibold` `label/brand/on-subtle`, полоса 3 × 20 `surface/brand/brand` у края меню.
- collapsed — строка в side-bar-flyout: 228 × 36, отступы 0 10, без полосы.
- counter danger m справа — только когда там ждут действия.

## side-bar-group `1338:1500`
Открытый раздел: `[side-bar-item open=true, Show chevron] [подпункты — side-bar-subitem, gap 2]`, gap 2, ширина 260. Под иконкой раздела — линия 1 px `outline/subtle` (x 23) от первого подпункта до последнего; плашка подпункта ложится поверх неё. Свойства: `Show item 3` (вкл.), `Show item 4`, `Show item 5`; раздел и подпункты — открытые вложенные экземпляры (меняются в панели свойств).

## side-bar-flyout `1338:1535`
Подпункты раздела в свёрнутом меню (72): 240, отступы 6, gap 2, `radius/l`, `surface/elevated` + обводка 1 `outline/elevated` + `shadow/lg`. Заголовок 32 — название раздела `web/subheadline-semibold` `label/secondary`, отступы 0 10; строки — side-bar-subitem mode=collapsed. Свойства: `Title`, `Show item 3/4/5`. Встаёт справа от иконки раздела через 8 px, верх — на уровне пункта; слой `layer/dropdown`; появление 200 ms (`duration/quick`, `easing/flow`).

## role-switch `800:2025`
`[текст: Title web/subheadline-semibold label/primary + Company web/caption-1 label/secondary] [дорожка: отступы 4, gap 2, radius/full, surface/neutral/default — две кнопки 36: user 20 и shield-01 20]`. Текущая сторона — на бегунке `surface/segmented/thumb` + `shadow/sm`, иконка `label/brand/brand`; другая — `label/secondary` (hover `label/primary`). collapsed — дорожка вертикально, без текста. focus — кольцо 40 `outline/focus` + `focus/ring`.

## Правила (доска «side-bar rules (DS2)» `1341:1666`)
- expanded 284 — экран от 1440 px; collapsed 72 — меньше 1440 px, подписи в подсказках.
- Активный пункт: синяя полоса у края, светло-синий фон, полужирная подпись, иконка solid. Остальные — иконка line, серая подпись.
- Счётчик — только когда там ждут действия.
- Переключатель «сотрудник / администратор» — в нижней строке, только у кого есть обе роли.
- Свернуть — пункт «Скрыть» внизу меню, не круглая кнопка на краю. Выбор запоминается.

### Разделы с подпунктами
- Раздел — не страница: нажатие открывает и закрывает его на месте, шеврон вниз / вверх. Подпункты без иконок, подпись на одной линии с названием раздела; тонкая линия под иконкой раздела связывает их.
- Один уровень вложенности, 2–7 подпунктов. Один подпункт — не раздел, а обычный пункт. Нужно глубже — вкладки на странице.
- Текущая страница отмечается в одном месте — у подпункта (полоса, фон, полужирная подпись). Открытый раздел с ней — полужирное название и синяя solid-иконка без фона. Закрытый раздел с ней — отметки активного пункта у самого раздела.
- Раздел с текущей страницей открыт при входе; выбор «открыт / закрыт» запоминается; открытыми могут быть несколько разделов.
- Счётчик: раздел закрыт — сумма у раздела; открыт — у подпунктов.
- Свёрнутое меню: у раздела вместо подсказки — side-bar-flyout. Открывается при наведении (100 ms) и по клику, Enter, →; закрывается по Esc, ←, клику мимо, уходу указателя (300 ms).
- Клавиатура: Tab — к разделу, Enter / пробел — открыть или закрыть; `aria-expanded` у раздела, `aria-current="page"` у текущей страницы.
- Движение: шеврон и раскрытие — 200 ms, `duration/quick` + `easing/standard`, без отскока.

Примеры в Figma: `.side-bar example / open section with the current page` `802:2489`, `… / closed section with the current page` `1340:1592`, `… / collapsed with flyout` `1340:1800`.

## Разметка
```html
<a class="of-sidebar-item" href="/" aria-current="page"><svg class="of-icon"><use href="#i-home-01-line-24"/></svg><svg class="of-icon of-sidebar-item__solid"><use href="#i-home-01-solid-24"/></svg><span class="of-sidebar-item__label">Главная</span></a>
```
У активного пункта line-иконка прячется, solid показывается сама — нужно положить обе. У «Моё подразделение» solid нет (`user-group`, вопрос 10) — кладётся только line, и она остаётся у активного пункта.

Раздел с подпунктами (отметки текущей страницы CSS ставит сам по `aria-current` подпункта):
```html
<div class="of-sidebar-group">
  <button class="of-sidebar-item" type="button" aria-expanded="true" aria-controls="sb-rooms"><svg class="of-icon"><use href="#i-meeting-room-line-24"/></svg><svg class="of-icon of-sidebar-item__solid"><use href="#i-meeting-room-solid-24"/></svg><span class="of-sidebar-item__label">Конференц-залы</span><svg class="of-icon of-sidebar-item__chevron"><use href="#i-chevron-down-line-16"/></svg></button>
  <div class="of-sidebar-group__items" id="sb-rooms" role="group" aria-label="Конференц-залы">
    <a class="of-sidebar-subitem" href="/rooms/manage" aria-current="page"><span class="of-sidebar-subitem__label">Режим управления</span></a>
    <a class="of-sidebar-subitem" href="/rooms"><span class="of-sidebar-subitem__label">Интерфейс пользователя</span></a>
  </div>
</div>
<!-- свёрнутое меню: справа от иконки раздела -->
<div class="of-sidebar-flyout" role="group" aria-label="Конференц-залы" data-enter><div class="of-sidebar-flyout__title">Конференц-залы</div>
  <a class="of-sidebar-subitem" href="/rooms/manage" aria-current="page"><span class="of-sidebar-subitem__label">Режим управления</span></a> …</div>
```
`aria-expanded="false"` прячет подпункты и поворачивает шеврон обратно. Для статичного показа раздела «открыт, текущая внутри» — `data-state="active-child"`.

## Расхождения в Figma
1. В самом компоненте side-bar-item в состоянии active стоит **line**-иконка (solid ставится уже в экземпляре в side-bar).
2. Нет solid-версии `user-group` (вопрос 10 в `decisions.md`).
3. Отступы меню 16 12 20 12, gap 12 в пункте, отступ подпункта 48, полосы 3 × 24 и 3 × 20, линия раздела x 23 — числами.
