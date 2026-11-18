# nav-bar — шапка, меню профиля, поиск, чат поддержки, меню приложений

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `nav-bar`, 2026-11-17. Код — в `assets/components.css`:
- шапка и её меню: `.of-navbar`, `.of-profile-menu`, `.of-search-results`;
- чат поддержки: `.of-chat`, `.of-chat-header`, `.of-chat-msg`, `.of-chat-system`, `.of-chat-typing`, `.of-chat-input`, `.of-chat-rating`, `.of-rate-option`;
- меню приложений: `.of-apps-menu`, `.of-app-item`, `.of-app-icon`, `.of-icon-cell`, `.of-bg-swatch`, `.of-bookmark-form`.

Образцы и сверка — на доске `assets/components-preview.html`. Иконки (67 новых: шапка, чат, глифы приложений и закладок) — в `assets/icons.json`.

## nav-bar `41:1273`
Высота 82 (`--shell-nav-bar-height`), отступы `space/16` `space/20`, `surface/default`, линия снизу 1 px `outline/subtle`. Свойство `Show support` убирает кнопку поддержки там, где чат не подключён.

Строка из трёх частей, промежуток 12:
- **Слева** — бренд, gap 12: логотип 40 (картинка, `radius/m`, `shadow/sm`) и два текста через gap 4: компания `web/headline` `label/primary`, продукт `web/subheadline` `label/tertiary`. Название и логотип у каждого клиента свои (white label). В коде по умолчанию — `assets/logo/logo-app-icon.svg` (значок приложения One Flow); у клиента — его файл. Название компании в примерах — `[Компания]`.
- **По центру** — поиск m round, ширина 320, подсказка «/ + SHIFT» (так в компоненте; доска правил говорит «/» — вопрос 21).
- **Справа**, прижато к краю, gap 16:
  - кнопки, gap 8: icon-button neutral l round — поддержка (`headset-hg` 24), уведомления (`bell` 24 + counter danger m в точке 28, −4), приложения (`layout-grid-add` 24);
  - профиль: пилюля 44, отступы 4 10 4 4, gap 4, `surface/neutral/default`, avatar 36 + `chevron-down` 16 `label/secondary`.

Левая и правая части растягиваются поровну, поэтому поиск стоит ровно по центру.

Состояния кнопки профиля: наведение — `surface/neutral/hover`, как у neutral-кнопки (записано в описании nav-bar и на доске правил).

Открытые панели:
- чат открыт — кнопка поддержки `data-style="tonal"`;
- меню профиля открыто — пилюля `surface/brand-subtle/default`, шеврон вверх `label/brand/on-subtle` (в коде шеврон поворачивается на 180°).

## profile-menu `793:1152` · подменю `793:1263` (язык), `793:1317` (тема)
- **Меню профиля**: ширина 272, отступы `space/8`, gap 2, `radius/l`, `surface/elevated`, `shadow/lg`. Внутри:
  - user l в рамке с отступами 8;
  - разделитель;
  - menu-item: «Язык» (`world`) и «Тема» (`contrast-2`) с `chevron-right` 20, «Настройки» (`settings`);
  - разделитель;
  - «Выйти» (`logout`, tone danger).

  Иконки пунктов — 24-е, показаны в 20.
- **Подменю** открываются вбок, ширина 264:
  - язык — пункты 64: название + подпись, справа radio, без иконки;
  - тема — `sun` / `moon` / `brightness-auto` + radio.
- **В коде**: пункты — `.of-menu__item` из context-menu; у пунктов подменю `role="menuitemradio"`, radio внутри только показывает выбор.

## search-results `793:1442`
- **Панель**: ширина 320, отступы `space/8`, gap 2, `radius/l`, `surface/elevated`, `shadow/lg`.
- **Строка**: отступы 8, `radius/m`, user l (avatar 44, имя `web/body-medium`, роль и подразделение `web/subheadline`). Наведение и выбор с клавиатуры — `surface/elevated-hover`.
- **Пусто** (`state=empty`): «Ничего не найдено», `web/body` `label/secondary`, отступы 10 8.

## support-chat `964:1554`
Окно 380 × 600: `radius/xl`, `surface/elevated`, `shadow/lg`, `layer/dropdown`. Состав: шапка, тело (отступы 16, gap 12, прокрутка), поле ввода.

Состояния:
- **topic** — «Сегодня», приветствие и чипы тем;
- **connecting** — «Подключаем оператора…» и индикатор «печатает»;
- **chat** — переписка с оператором;
- **file-error** — alert s danger над полем;
- **callback** — форма обратного звонка;
- **callback-requested** — empty-state «Ждите звонка оператора»;
- **rate** — оценка после чата;
- **offline** — empty-state `wifi-off`, поле disabled;
- **error** — empty-state `alert-circle` + «Повторить».

Пользователь уже вошёл, имя окно не спрашивает. В состояниях callback, callback-requested, offline и error в шапке нет кнопки звонка.

- **chat-header `962:2732`**: отступы 12 12 12 16, gap 12, линия снизу `outline/subtle`.
  - Слева: метка 44 `surface/brand-subtle/default` с `headset-hg` 20 `label/brand/brand` или фото оператора — avatar 44.
  - Текст, gap 2: имя `web/body-semibold`, статус `web/footnote` `label/secondary` с точкой 8 `surface/success`.
  - Кнопки: «перезвонить» `phone-call` и «закрыть» `x` — icon-button ghost m round.
  - offline — метка `surface/neutral/default` с иконкой `label/secondary`, точка `outline/control`.
- **chat-message `962:2786`**: колонка, gap 4.
  - Входящее — пузырь слева: `surface/neutral/default`, `web/body` `label/primary`, отступы 10 14, скругление 16 16 16 4.
  - Исходящее — пузырь справа: `surface/brand/brand`, `label/inverse`, 16 16 4 16; у времени галочки `checks` 16 `label/brand/brand`.
  - Пузырь до 280. Время — `mono/caption-1` `label/tertiary`; внутри серии сообщений одного человека время скрывают.
  - Картинка — 240 × 160, без отступов, в обоих направлениях на сером.
  - Файл: отступы 10 16 10 10, gap 12. Круг 40 с `file-text` 20 (входящее — `surface/default` и `label/brand/brand`, исходящее — `surface/brand/hover` и `label/inverse`). Имя `web/subheadline-medium`, размер `web/caption-1`.
- **chat-system `962:2787`**: по центру, `web/caption-1` `label/tertiary`.
- **chat-typing `962:2789`**: пузырь входящего, отступы 14, три точки 6 `label/tertiary` с непрозрачностью 1 / 0,6 / 0,3. Анимации в DS нет.
- **chat-input `962:2836`**: отступы 12, gap 8, линия сверху `outline/subtle`.
  - Состав: «прикрепить» (`paperclip`, ghost m round), поле 44 (`radius/full`, отступы 0 16, `surface/neutral/default`, подсказка `label/tertiary`), «отправить» (`send`, primary m round).
  - «Отправить» доступна только с текстом. Enter отправляет, Shift + Enter — новая строка.
  - disabled — поле `surface/disabled`, всё `label/disabled`.
- **Обратный звонок**: заголовок `web/headline`, пояснение `web/subheadline` `label/secondary`, phone-input-outline, согласие (checkbox + текст со ссылкой), примечание `web/footnote`. Внизу две кнопки l round во всю ширину, gap 16.
- **Оценка**: карточка `surface/neutral/default`, `radius/l`, отступы 20 0, gap 16, по центру. Четыре rate-option через 4.
- **rate-option `962:2865`**: лицо 56 (круг) `surface/neutral/default`, иконка 24 `label/secondary`; подпись `web/caption-1`.
  - Лица: Ужасно `mood-angry`, Плохо `mood-sad`, Хорошо `mood-smile`, Отлично `mood-happy`.
  - hover — `surface/neutral/hover`, иконка `label/brand/brand`; selected — `surface/brand-subtle/default`, иконка и подпись `label/brand/brand`.

## apps-menu `974:3524`
Меню 396: `radius/xl`, `surface/elevated`, `shadow/lg`, `layer/dropdown`.
- **Шапка**: отступы 12 12 4 20, «Приложения» `web/headline`, справа карандаш (`edit`, ghost m round).
- **Тело**: отступы 8 16 16, gap 16. Секции, gap 8: заголовок `web/caption-1-semibold` `label/secondary` (отступы 0 4), сетка 4 × 88 через 4.
  - «Приложения компании» — набор задаёт компания; Front Desk видят только руководители и секретари.
  - «Мои закладки» — свои ссылки и плитка «Добавить».

Состояния:
- **edit** — «Настройка приложений» + button primary s round «Готово», подсказка `web/footnote` `label/secondary`. Плитки компании можно только переставлять. Закладки можно менять (нажатие открывает окно) и удалять (× с undo-toast). «Добавить» скрыта.
- **dragging** — плитка в руке.
- **empty** — закладок нет: «Добавить» + подсказка `web/subheadline` `label/secondary` через 12.
- **many** — выше 560 тело прокручивается, внизу затухание 40 к `surface/elevated`. В коде `data-scroll="more"`, пока не докрутили до конца.

Порядок плиток общий с виджетом «Приложения» на главной.

## app-icon `968:2698`
Плитка 56 (`radius/l`) или 40 (`radius/m`), одинаковая в обеих темах. Свойство `background` — 10 вариантов.

Слои:
- **Фон**: градиент 135° `palette/dark/fill` → `palette/neutral/950`.
- **Два размытых блика** из `palette/app/*`: большой снизу слева (0,85), малый сверху справа (0,45).
- **Затемнение** чёрным 20 % и внутренняя тень белым 40 % (2, 2, размытие 8).
- **Глиф** белый (`palette/neutral/0`): 32 с обводкой 2 на плитке 56, 24 с обводкой 1,5 на плитке 40.

Пары бликов:

| background | большой блик | малый блик |
|---|---|---|
| teal | teal | blue |
| sky | sky | indigo |
| blue | blue | violet |
| amber | amber | red |
| orange | orange | pink |
| indigo | indigo | sky |
| violet | violet | pink |
| red | red | orange |
| green | green | teal |
| pink | pink | orange |

В коде:
```html
<span class="of-app-icon" data-bg="blue"><span class="of-app-icon__light"></span><svg class="of-icon"><use href="#i-folder-01-line-24"/></svg></span>
```
Большой блик — `::before`, малый — `__light`, затемнение — `::after`. Размытие в CSS вдвое меньше, чем в Figma: 16 → 8, 12 → 6.

## app-item `971:2714`
Плитка 88 × 100: отступы 8 4, gap 6, `radius/l`. app-icon 56 + название `web/subheadline` `label/primary` в одну строку (полное — в подсказке).

| состояние | вид |
|---|---|
| hover | `surface/neutral/default` |
| pressed | `surface/neutral/hover` |
| focus | кольцо `outline/focus` 2 + `focus/ring` |
| edit | пунктир 1,5 (4/4) `outline/control`, подпись `label/secondary`; плитка покачивается ±1,5° — `duration/instant`, `easing/standard`, туда-обратно, выключено при reduced motion |
| edit-custom | как edit + кнопка удаления 24 `surface/inverse`, `x` 16 `label/inverse`, обводка 2 `surface/default` снаружи, в точке 43, −6 от плитки |
| dragging | `surface/elevated` + `shadow/lg` |
| placeholder | пустая, `surface/brand-subtle/default` + пунктир `outline/brand` |

Виды плитки:
- **add** — квадрат 56 с пунктиром `outline/control` и `plus` 24 `label/secondary`.
- **more** — квадрат `surface/neutral/default` с «+5» `mono/subheadline-medium`, подпись «Все приложения»; из виджета открывает меню.

## icon-cell `977:48930` · background-swatch `977:48941` · bookmark-form `977:49655`
- **icon-cell** 44, `radius/m`: `surface/neutral/default`, глиф 20 `label/secondary`.
  - hover — `surface/neutral/hover` + `label/primary`;
  - selected — `surface/brand-subtle/default`, обводка 2 `outline/brand`, глиф `label/brand/brand`.
- **background-swatch** 44, скругление 14: внутри app-icon 40. selected — обводка 2 `outline/focus` внутри и белая галочка `check` solid (24) по центру; на остальных галочки нет.
- **bookmark-form** — содержимое окна «Новая закладка / Изменить закладку» (modal s). Ширина 448, gap 20:
  1. превью плитки на `surface/page` (`radius/l`, отступы 16 0), повторяет выбранные фон, иконку и название;
  2. «Название» до 20 символов (input-outline);
  3. «Ссылка» (input-outline) с подписью: «Страницы портала открываются в этой же вкладке, другие сайты — в новой»;
  4. «Фон» — 10 образцов через space-between;
  5. «Иконка» — 24 ячейки, 8 в ряд, между рядами 8.

  Подписи групп — `web/subheadline-medium`. «Создать» доступна, когда есть название и правильная ссылка. Ошибка ссылки: «Введите ссылку полностью, например https://example.com».

Иконки ячеек: bookmark-01, globe-02, link-01, file-01, folder-01, book-02, briefcase-01, user-group, calendar-01, mail-01, video-01, pie-chart, wallet-01, calculator, shopping-cart-01, coffee-01, airplane-01, car-01, location-01, wrench-01, source-code, database-01, cloud, key-01 (все line 20).

## Правила (доска «nav-bar rules (DS2)» `1211:550`)
- **Состав**: слева бренд, в центре поиск, справа поддержка → уведомления → приложения → профиль. Порядок справа не меняем.
- **Поиск**: серое поле, в фокусе синяя обводка 2 px, подсказка «/». Результаты — выпадающая панель. Если ничего не нашлось, панель показывает, что искали и что попробовать.
- **Уведомления**: красный счётчик с числом непрочитанных; ноль — без счётчика. Нажатие открывает центр уведомлений.
- **Приложения**: приложения компании только переставляются, свои закладки можно добавить, изменить и удалить.
- **Поддержка**: окно чата справа снизу; пока оно открыто, кнопка тональная.
- **Профиль**: язык, тема, выход. Подменю открываются вбок.

## Исправлено в Figma 2026-11-17 (решения владельца DS)
- Галочка на выбранном фоне теперь белая (`palette/neutral/0`) и видна только на выбранном образце. Раньше она была тёмной на всех.
- Обводка глифа на плитке 40 — 1,5 вместо 1,75: 10 вариантов app-icon и 93 вектора в экземплярах. Описание app-icon поправлено.
- В chat-header метка и фото оператора — 44; avatar больше не ужат. Высота шапки осталась 69.
- Наведение на кнопку профиля записано в описание nav-bar и на доску правил.
- 740 отступов, промежутков и скруглений, равных токенам, привязаны к `space/*` и `radius/*` (круги — `radius/full`). Привязаны главные компоненты, экземпляры наследуют.
- Specs / nav-bar пересобран (`1314:5838`). Тёмные превью проверены. Чтобы изменения дошли до файлов команды, библиотеку нужно опубликовать.

## Расхождения в Figma (остались)
1. **Значения без токена**: отступ 14 у пузыря и «печатает», скругление 14 у background-swatch, промежуток 13,7 в сетке иконок (это space-between), gap 44 у левой части шапки (там один элемент, ни на что не влияет).
2. **Затемнение плитки** — чёрный 20 % и белая тень 40 % заданы цветом, а не токеном. В коде так же: `rgb(0 0 0 / .2)` и `palette/neutral/0` 40 %.
3. **Подсказка горячей клавиши**: в компоненте «/ + SHIFT», на доске правил «Горячая клавиша «/»». В коде — как в компоненте (вопрос 21).

## Разметка
Полная разметка каждой части — в комментариях к блокам `nav-bar`, `support chat` и `apps menu` в `components.css`.
