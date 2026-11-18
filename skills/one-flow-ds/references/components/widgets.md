# widgets — виджеты главной

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `widgets`, 2026-11-17. Код — блок `widgets` в `assets/components.css`. Правила — доска «widgets rules (DS2)» `1211:690`.

## Общее (`.of-widget`)
- **Карточка**: отступы 14 16 16, `radius/xl`, `surface/default`.
- **Размеры**: s 144 × 144, m 304 × 144, l 304 × 304; приложения 624 × 304.
- **Заголовок** `web/body-medium` + `chevron-right` 16, если виджет ведёт в раздел. Главное число — `mono/title-2`, рядом статус s (точка и слово).
- **updated** — фон `surface/info-subtle`, гаснет за 560 ms. **loading** — скелетон того же размера.

## Виджеты
- **widget-attendance `870:183`** (l):
  - шапка: «Посещаемость ›» и период `web/subheadline` `label/secondary`, справа круг 36 `surface/brand-subtle/default` с `clock-01` 20;
  - два блока поровну: отступы 10 12 12, `radius/l`, `surface/neutral/default` (в updated — `surface/default`);
  - в блоке: название `web/subheadline-medium` `label/secondary` + лимит `label/tertiary`; значение `mono/title-3` + status s.
- **widget-weather `870:217`**:
  - s — заголовок, температура и статус; тёплое свечение — круг 128 `palette/warning/soft` с размытием (в Figma 56, в CSS 28);
  - m — две половины через линию `outline/subtle`: погода и воздух (AQI — точка и слово: Хороший, Умеренный, Для чувствительных, Вредный);
  - обновление раз в час, число сменяется за 200 ms.
- **widget-food `870:239`** — «Еда ›», «С» + время `mono/title-2`; m — ещё круг 48 `surface/brand-subtle/default` с `dish-01` 24. Нажатие открывает раздел «Еда».
- **widget-mood `870:558`** (m):
  - question — пять серых лиц 54 через space-between;
  - question-hover — лицо под указателем цветное (100 ms);
  - results — «Настроение команды» + число ответов; общее лицо 48, слово `web/title-3` и «Вы ответили: …»; полоса 8 долей через 2;
  - waiting — ответ сохранён, но ответов меньше 5, итог не показываем.
- **widget-birthdays `870:591`** (m):
  - «Дни рождения сегодня» + counter neutral m + шеврон;
  - до четырёх фото 56 внахлёст −12 с кольцом 2 `surface/default`, «+N» на стекле `surface/glass/brand` 16 % (`label/brand/strong`);
  - нет — «Сегодня дней рождения нет» вместо скрытия виджета.
- **apps-card `882:593`** (624 × 304):
  - «Приложения» `web/headline`;
  - слева блок 238 (`radius/l`, `surface/neutral/default`, картинка, «Формы ›» и описание);
  - справа плитки app-item 80 через 6, «Добавить» последней. До 7 плиток; больше — первые 6, «+N Все приложения» и «Добавить».
  - Порядок общий с меню приложений в шапке.
- **app-tile `882:523`** — 80 × 84: app-icon 56 + название `web/subheadline`. add — квадрат 56 `radius/l` с рамкой 1,5 `outline/control` и `plus` 32.
- **banner `943:1429`** — стопка слайдов:
  - слайд 1104 × 300, `radius/xl`, картинка;
  - справа внизу две стеклянные кнопки 56 × 44 (`surface/glass/neutral` 16 %, `outline/glass` 35 %, `effect/glass`, `chevron-down` / `chevron-up` 16 `label/inverse`);
  - под слайдом край 12 с отступами 56 по бокам, скругление снизу 12, `surface/brand-subtle/hover`.

## Сетка главной (правила)
- **Контент** 1104 по центру; слева лента 784, справа колонка 304. Под баннером — приложения 624, две плитки 144, посещаемость 304.
- **Стиль**: все виджеты главной в одном стиле; декоративные фоны — только у баннера.

## Расхождения
1. **Лица настроения** — растровые 3D-эмодзи из внешней библиотеки (вопрос 14 в `decisions.md`). В коде это слот `<img>`; серый вид — `filter: grayscale(1)`. Это толкование: в Figma «серые» лица — отдельные картинки.
2. **Полоса настроения** закрашена примитивами палитры (`danger/base`, `orange/400`, `warning/fill`, `success/dark`, `success/base`), а не ролями. Оранжевый `orange/400` — вне правила Spark (вопрос 16).
3. **app-tile add** с рамкой сплошной линией, а у app-item add в меню приложений — пунктир. В apps-card используется app-item.
4. **Свечение погоды** — примитив `palette/warning/soft`.
