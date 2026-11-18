# attendance — посещаемость

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `attendance` (`1159:23`), 2026-11-17.
- Код: `.of-day-type`, `.of-worktime-bar`, `.of-worktime-scale`, `.of-attendance-day`, `.of-entry`, `.of-attendance-entries` и `.of-attendance-days` (карточка списка по примеру) в `assets/components.css`.
- Пример страницы в Figma: `.attendance example / week` `1161:2866`; ещё `/ week, all days` `1161:3319` и `/ day without entries` `1161:3747`.

## Страница
Каркас: nav-bar + side-bar (пункт «Посещаемость» активен), контент 1104, page-header «Посещаемость». Под ним две колонки через 16:
- **Слева карточка дней** — 640, `surface/default`, `radius/xl`, сверху вниз:
  - панель: отступы 16 24, линия снизу `outline/subtle`; «‹ [календарь] 21–27 сен 2026 ›» — icon-button ghost s и button neutral s; справа badge m с `clock` «Буфер 3 мин»;
  - легенда: отступы 16 24 8, day-type tag через 8;
  - список дней: отступы 0 12, gap 4;
  - футер: отступы 12 0 20, button neutral s round «Показать ещё · 2 дня» с `chevron-down`. Свёрнутый список прячет выходные.
- **Справа** attendance-entries 448, по высоте списка дней.

Выбор дня не прокручивает страницу.

## day-type `1159:43`
Точка 8 + слово, gap 6. Цвет точки: holiday `surface/brand/brand`, transferred `surface/warning`, shortened `surface/signal` (Spark — только как метка; на тёмном Sky).
- **tag** — пилюля легенды: отступы 4 12 4 10, `radius/full`, `surface/neutral/default`, `web/subheadline` `label/secondary`.
- **inline** — рядом с датой: без фона, `web/caption-1`.

## work-time-bar `1159:57` · work-time-scale `1159:58`
Полоса рабочего дня от начала до конца графика: 48, `radius/full`.

| type | вид |
|---|---|
| no-data | `surface/neutral/default`, ещё и выходной |
| worked / violations / in-progress | основа `surface/success` (на работе) |
| absent | `surface/danger/default` |

Отрезки:
- отсутствия — `surface/danger/default` (опоздание, перерыв сверх нормы, ранний уход);
- остаток сегодняшнего дня — штриховка по `surface/neutral/default`: линии 1,5 `outline/subtle` под 45°, шаг 10.

Отрезки задаются в процентах от графика: `<i data-kind="away" style="left:…; width:…">`, `<i data-kind="rest" style="left:…">`. Полоса никогда не стоит одна: рядом статус дня словом.

Шкала — 16: начало, отметка обеда (по своей доле дня, `--mid`) и конец. Засечка 1 × 8 `outline/default`, время `mono/caption-2` `label/tertiary`, gap 4.

## attendance-day `1160:178`
Отступы 12, gap 8, `radius/l`.
- **Шапка**: дата `web/body-semibold` (+ day-type inline через 8) и badge s со статусом справа.
- **Под шапкой** полоса и шкала через 4.

Состояния:
- hover — `surface/neutral/default`;
- selected — рамка 1 px `outline/brand` внутри;
- today — дата `label/brand/brand`, badge brand «Сегодня».

В коде: `<button aria-pressed>` для выбора, `aria-current="date"` для сегодня.

Статусы: Нет статуса (neutral), Сегодня (brand), Отработан (success), Не полностью (warning), Отсутствовал (danger), Выходной (neutral).

## entry `1160:230`
Отступы 12, gap 12, `radius/l`, `surface/neutral/default` (hover `surface/neutral/hover`). Слева направо:
1. Направление — круг 36: вход `surface/success-subtle` + `arrow-right` 20 `label/success`; выход `surface/danger-subtle` + `arrow-left` 20 `label/danger`. Различаются формой стрелки, не только цветом.
2. Текст, gap 2:
   - верхняя строка (gap 6, по базовой линии): время `mono/body-medium`, «·» `web/subheadline` `label/tertiary`, пропуск `mono/subheadline` `label/tertiary`;
   - ниже: камера и место `web/subheadline` `label/secondary`.
3. Кадр с камеры — 40 × 48, `radius/s`.

Новые сверху.

## attendance-entries `1160:314`
`radius/xl`, `surface/default`.
- **Шапка**: отступы 20 24, gap 2: «Входы и выходы» `web/headline`, дата `web/subheadline` `label/secondary`.
- **Разделитель**.
- **Список**: отступы 16, gap 8.

Пусто (будущий день, выходной, нет событий камер) — empty-state m по центру: `door-enter`, «Нет входов за этот день» / «Входы и выходы появятся здесь, когда камера вас узнает».

## Правила (доска «attendance rules (DS2)» `1211:607`)
- **Страница**: слева список дней недели, справа входы и выходы выбранного дня. Выбор дня не прокручивает страницу.
- **Полоса**: зелёный — на работе, красный — отсутствовал в рабочее время, штриховка — остаток сегодняшнего дня, серый — нет данных или выходной. Под полосой шкала: начало, обед, конец.
- **Типы дней**: праздник, перенесённый рабочий, сокращённый — точка + слово.
- **Входы и выходы**:
  - новые сверху;
  - вход — зелёная стрелка →, выход — красная ←;
  - в строке время, пропуск, камера и место, кадр с камеры;
  - нет событий — пустое состояние, а не пустая колонка.

## Расхождения и замечания
1. **Увеличенный кадр** при наведении на entry в Figma ещё не нарисован (так сказано в описании).
2. **Фокус дня** в Figma не нарисован. В коде стандартное кольцо `outline/focus` 2 + `focus/ring`.
3. **Штриховка** в Figma — вектор из линий. В коде — повторяющийся градиент с той же толщиной, углом и шагом.
4. **Цвета полосы**: `surface/success` и `surface/danger/default` — статусные, а не `chart/*`. Это осознанно: полоса показывает статус времени, а не серию данных. Рядом всегда статус словом.
