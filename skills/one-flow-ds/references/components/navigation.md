# navigation — page-header · breadcrumb · pagination · stepper

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `navigation`, 2026-11-17. Код: `.of-page-header`, `.of-breadcrumb`, `.of-pagination`, `.of-stepper` / `.of-step` в `assets/components.css`.

## page-header `942:841`
Шапка страницы внутри контейнера контента, по его ширине (1104). Горизонтально, между частями — gap 24, по центру, min-height 36.
`[left gap 12: back — icon-button neutral m round (скрыт) · titles gap 4: breadcrumb (скрыт) · Title web/title-3 label/primary · Description web/subheadline label/secondary (скрыт)] [actions gap 8: secondary — button neutral m default (скрыт) · action — button primary m default]`.

## breadcrumb-item `704:73` · breadcrumb `704:74`
- Звено: `[icon 16 (обычно home, скрыт)] [Label web/subheadline] [separator chevron-right 16 label/tertiary]`, gap `space/4`.
- state: default — Label `label/secondary` · hover — `label/primary` · current — `web/subheadline-medium` `label/primary`, без разделителя, не нажимается.
- Цепочка: звенья в ряд, gap `space/4`; последнее — current.

## pagination-item `704:127` · pagination `704:128`
- Кнопка: круг, высота `control/m` 36, мин. ширина 36, отступы `0 space/8`, `radius/full`, Label `web/subheadline-medium`.
- type: page — номер · ellipsis — «…» · prev / next — `chevron-left` / `chevron-right` 20, квадрат 36, заливка `surface/neutral/default`.
- state: default — без заливки, `label/secondary` · hover — `surface/neutral/hover`, `label/primary` · selected — `surface/brand/brand`, `label/inverse` · disabled — `label/disabled` (стрелка на первой / последней странице).
- pagination: ряд, gap `space/4`: стрелка, первая, …, текущая и соседние, …, последняя, стрелка.

## step `727:416` · stepper `727:527`
Свойства step: `orientation` horizontal · stacked · vertical; `state` upcoming · current · done · error; `Label`, `Description`, `Show description`, `Number`, `Show connector`, `Show connector start`.
- Маркер — круг 28: upcoming `surface/neutral-strong/default` + номер `web/caption-1` `label/secondary` · current `surface/brand/brand` + номер `label/inverse` + кольцо 3 px снаружи `surface/brand-subtle/default` · done `surface/brand-subtle/default` + `check` 16 `label/brand/brand` · error `surface/danger-subtle` + `exclamation-mark` 16 `label/danger`.
- Label `web/subheadline-medium`: upcoming `label/secondary`, current и done `label/primary`, error `label/danger`. Description `web/caption-1` `label/tertiary`, gap 2.
- Линия 2 px `radius/full`: `outline/default`, после пройденного шага — `surface/brand/brand`.
- horizontal: `[marker] [text] [линия — растягивается]`, gap 8; у последнего шага линии нет.
- stacked: сверху `[линия до] [marker] [линия после]` (gap 8), под ними подпись по центру (gap 8); у первого шага нет линии до, у последнего — после.
- vertical: слева столбец `[marker] [линия, тянется]` (gap 4), справа текст с отступами 4 сверху и 20 снизу, gap 12; шаги друг под другом с gap 4.

## Правила (доска «navigation rules (DS2)» `1211:212`)
- page-header есть на каждой странице: заголовок, при необходимости описание, «назад», крошки и одно главное действие. Главное действие страницы — справа в шапке, не внизу.
- breadcrumb — только при глубине от трёх уровней; последний пункт — текущая страница, не ссылка; длинную цепочку сокращаем в середине «…» (из описания: больше 4 уровней).
- pagination — под таблицей справа; слева — «1–10 из 48» и «Строк на странице». Номера: первая, последняя и две рядом с текущей. Меньше 2 страниц — не показывать.
- stepper — процесс из 3–7 шагов, который проходят по порядку (заявка, онбординг). horizontal — над формой, vertical — в боковой колонке, stacked — когда шаги длинные. Пройденный шаг можно открыть снова, будущий — нет.

## Разметка
```html
<header class="of-page-header">
  <div class="of-page-header__left"><div class="of-page-header__titles">
    <nav class="of-breadcrumb" aria-label="Путь"><a class="of-breadcrumb__item" href="/"><svg class="of-icon"><use href="#i-home-line-16"/></svg>Главная</a><a class="of-breadcrumb__item" href="/timesheet">Табель</a><span class="of-breadcrumb__item" aria-current="page">Октябрь 2026</span></nav>
    <h1 class="of-page-header__title">Октябрь 2026</h1></div></div>
  <div class="of-page-header__actions"><button class="of-button">Закрыть табель</button></div></header>
<nav class="of-pagination" aria-label="Страницы"><button class="of-pagination__item" data-type="prev" aria-label="Назад" disabled><svg class="of-icon"><use href="#i-chevron-left-line-20"/></svg></button>
  <button class="of-pagination__item" aria-current="page">1</button><button class="of-pagination__item">2</button>…</nav>
<ol class="of-stepper"><li class="of-step" data-state="done"><span class="of-step__marker">1</span><span class="of-step__text"><span class="of-step__label">Причина</span></span></li>
  <li class="of-step" data-state="current" aria-current="step">…</li><li class="of-step" data-state="upcoming">…</li></ol>
```
Галочку и восклицательный знак в маркере рисует CSS (рисунки `check` и `exclamation-mark` 16 из Icons OneFlow).

## Расхождения в Figma
1. Иконки `home`, `chevron-right` (крошки, 16) и `chevron-left/right` (pagination, 20) — рисунки 24, уменьшенные; в коде — родные рисунки 16 и 20.
2. page-header: gap 24 / 12 / 4 / 8, step: gap 8 / 2 / 12 / 4, отступы 4 / 20, кольцо current 3, мин. ширина кнопки pagination 36 — числами, не токенами.
3. Какая иконка в кнопке «назад» page-header и drawer, по данным не видно — в коде `arrow-left` [Подтвердить].
