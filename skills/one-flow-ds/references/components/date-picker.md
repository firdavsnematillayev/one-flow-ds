# date picker — calendar · date-picker · date-range-picker · month-picker · time-picker

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `date picker`, 2026-11-17. Код: `.of-calendar`, `.of-calendar__day`, `.of-picker` (+ `data-type="month|time"`), `.of-months` / `.of-month`, `.of-time` / `.of-time__cell` в `assets/components.css`.

## calendar-day `710:1849` (12 вариантов)
Ячейка 40 × 36; выделение — круг 36 по центру; полоса периода — прямоугольник `surface/brand-subtle/default` на всю ячейку. Число `web/subheadline` `label/primary`.

| state | круг | полоса | число |
|---|---|---|---|
| default | — | — | `label/primary` |
| weekend | — | — | `label/danger` |
| hover | `surface/neutral/default` | — | `label/primary` |
| today | — | — | `web/subheadline-medium` `label/brand/brand` + точка 4 `surface/brand/brand` под числом (y 29) |
| selected | `surface/brand/brand` | — | `web/subheadline-medium` `label/inverse` |
| range-start | `surface/brand/brand` | правая половина | `web/subheadline-medium` `label/inverse` |
| range-middle | — | вся ячейка | `label/brand/on-subtle` |
| range-row-end | — | вся, справа скругление 18 | `label/brand/on-subtle` |
| range-row-start | — | вся, слева скругление 18 | `label/brand/on-subtle` |
| range-end | `surface/brand/brand` | левая половина | `web/subheadline-medium` `label/inverse` |
| outside / disabled | — | — | `label/disabled` |

## calendar `710:2266`
Ширина 280, столбец, gap `space/8`:
- шапка 32, отступ слева 10: месяц `web/body-medium` + `chevron-down` 16 `label/secondary` (gap `space/4`, по нажатию — выбор месяца и года), справа два icon-button ghost s round (`chevron-left` / `chevron-right`);
- строка дней недели 24: `web/caption-1` `label/tertiary`, Сб и Вс — `label/danger`;
- 6 недель по 7 дней, между неделями `space/2`. mode: single · range.

## date-picker `710:2725`
Приподнятая карточка: отступы `space/16`, gap `space/12`, `radius/xl`, `surface/elevated`, `shadow/lg`; внутри calendar. Футер (скрыт): Summary `web/subheadline-medium` + кнопки neutral-strong s round и primary s round, gap `space/8`, отступ слева 10. Открывается под полем даты (input-outline с иконкой `calendar` line 24 справа — `#i-calendar-line-24`, не `calendar-01`; так в примере `example / date field` на странице).

## date-range-picker `766:2595`
Та же карточка, ширина по содержимому: `[presets 160 — select-option, gap 2 (скрыты)] [calendar] [calendar]`, gap 24; футер на всю ширину (скрыт).

## month-cell `766:3158` · month-picker `766:3159`
- Ячейка 88 × 40, `radius/full`, `web/subheadline-medium` `label/primary`. hover `surface/elevated-hover` · current — `label/brand/brand` · selected `surface/brand/brand` + `label/inverse` · disabled `label/disabled`.
- Панель: карточка как у date-picker (ширина 306, gap 12); шапка — год `web/body-medium` и стрелки (меняют год); 4 ряда по 3 месяца, gap 4.

## time-cell `950:4351` · time-picker `950:4450`
- Ячейка 56 × 36, радиус 18, `mono/subheadline` `label/primary`. hover `surface/neutral/default` · selected `surface/brand/brand` + `mono/subheadline-medium` `label/inverse` · disabled `label/disabled`.
- Панель: отступы 12, gap 8, `radius/xl`, `surface/elevated`, `shadow/lg`. Шапка «Часы / Минуты» `web/caption-1` `label/secondary`. Два столбца (отступы 0 4, gap 2) прокручиваются, между ними линия 1 px `outline/subtle`. step 5 · 15.

## Правила (доска «date picker rules (DS2)» `1211:237`)
- Поле даты — input-outline с иконкой календаря; можно вводить с клавиатуры. Формат даты ДД.ММ.ГГГГ, время ЧЧ:ММ, 24 часа; цифры — JetBrains Mono.
- date-picker — одна дата, выбор сразу применяется, без кнопок; date-range-picker — период, два месяца, готовые периоды слева по желанию; month-picker — отчёты за месяц; time-picker — время, шаг 5 или 15 минут (15 — встречи и отпуска).
- Сегодня — синее число и точка под ним. Выходные — красным; недоступные даты — серым, выбрать нельзя. Неделя начинается с понедельника.
- Футер по умолчанию не нужен: выбор применяется по клику. «Отмена / Применить» — только у периода, когда выбор влияет на большие данные.

## Разметка
```html
<div class="of-picker" role="dialog" aria-label="Выбор даты"><div class="of-calendar">
  <div class="of-calendar__head"><button class="of-calendar__month" type="button">Ноябрь 2026 <svg class="of-icon"><use href="#i-chevron-down-line-16"/></svg></button>
    <button class="of-icon-button" data-style="ghost" data-size="s" data-shape="round" aria-label="Предыдущий месяц"><svg class="of-icon"><use href="#i-chevron-left-line-20"/></svg></button>
    <button class="of-icon-button" data-style="ghost" data-size="s" data-shape="round" aria-label="Следующий месяц"><svg class="of-icon"><use href="#i-chevron-right-line-20"/></svg></button></div>
  <div class="of-calendar__grid" role="grid"><span class="of-calendar__wd">Пн</span>…<span class="of-calendar__wd" data-weekend>Вс</span>
    <button class="of-calendar__day" data-state="outside">26</button>…<button class="of-calendar__day" data-state="today">17</button>…</div></div></div>
```
`range-row-start` / `range-row-end` в коде отдельным состоянием не нужны: `range-middle` в понедельник и воскресенье скругляется сам.

## Расхождения в Figma
- **Вид поля даты в форме.** Доска: «Поле даты — input-outline», а правило полей — «в одной форме один вид, на белой карточке серые». В форме из серых полей (окно, белая карточка) в коде поле даты серое (вопрос 22).
1. Отступ шапки календаря слева 10, gap панели month-picker 12, всё в time-picker (12 / 8 / 4 / 2), радиус time-cell 18, ширины ячеек и панелей, gap 24 у периода — числами, не токенами.
2. hover дня — `surface/neutral/default`, hover месяца — `surface/elevated-hover`: обе ячейки лежат на `surface/elevated`, а наведение разное.
3. Иконки шапки календаря — рисунки 24, уменьшенные до 16 и 20.
