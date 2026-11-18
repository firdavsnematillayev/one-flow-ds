# loading — spinner · skeleton · progress · progress-circle

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `loading`, 2026-11-17. Код: `.of-spinner`, `.of-skeleton`, `.of-progress`, `.of-progress-circle` в `assets/components.css`.

## spinner `701:315` (15 вариантов)
Свойства: `tone` brand · neutral · inverse; `size` xs · s · m · l · xl; `Label`, `Show label`.
Анатомия: `[ring: дорожка — полный круг + дуга — четверть круга от 12 до 3 часов, концы круглые] [Label]`.

| size | круг | толщина | gap до подписи | подпись |
|---|---|---|---|---|
| xs | 16 | 2.5 | `space/8` | `web/subheadline` |
| s | 20 | 3 | `space/8` | `web/subheadline` |
| m | 24 | 3 | `space/8` | `web/subheadline` |
| l | 32 | 4 | `space/12` | `web/subheadline-medium` |
| xl | 48 | 5 | `space/12` | `web/subheadline-medium` |

| tone | дорожка | дуга | подпись |
|---|---|---|---|
| brand | `surface/brand-subtle/default` | `surface/brand/brand` | `label/secondary` |
| neutral | `surface/neutral-strong/default` | `label/secondary` | `label/secondary` |
| inverse | `label/inverse` 30 % | `label/inverse` | `label/inverse` |

Размер: xs–s — внутри кнопок и полей, m — в карточках, l–xl — на всю страницу. inverse — только на тёмном и цветном фоне.

## skeleton `701:341` (12 вариантов)
Свойства: `type` text · title · block · avatar; `phase` static · start · end (положения луча для прототипа).
- text — высота 12, `radius/xs`; title — высота 20, `radius/xs`; block — `radius/m`, высота по месту (в компоненте 96); avatar — круг 40.
- Заливка `surface/skeleton/base`; луч — полоса шириной в половину заглушки, градиент `surface/skeleton/base → surface/skeleton/highlight → surface/skeleton/base`, проходит слева направо за 1200 ms по кругу.

## progress `701:422`
Анатомия: столбец, gap `space/8`: `[label row: Label web/subheadline-medium label/primary ↔ Value web/subheadline label/secondary] [track]`.
Дорожка: высота 4 (s) / 8 (m), `radius/full`, `surface/neutral-strong/default`; полоса `surface/brand/brand`.
Цвет полосы один, синий. «Готово» / «ошибка» — перекрасить полосу в `surface/success-strong` / `surface/danger/default` (в коде `data-tone="success|danger"`).

## progress-circle `767:205` (15 вариантов)
Свойства: `size` s · m · l; `value` 0 · 25 · 50 · 75 · 100; `Show label`.
- s 32 — без подписи, кольцо 4 (внутренний радиус 75 %); m 56 — подпись `web/caption-1`, кольцо ≈ 6 (79 %); l 96 — подпись `web/headline`, кольцо ≈ 8 (83 %). Подпись `label/primary` по центру.
- Дорожка `surface/neutral-strong/default`, доля `surface/brand/brand` от 12 часов по часовой. Цвет один; статусный — перекрасить кольцо value.

## Правила (доска «loading rules (DS2)» `1211:137`)
- skeleton — грузится страница, список, карточка (повторяет их форму); spinner — ждём ответ в маленьком месте: кнопка, поле, строка; progress — известна доля: загрузка файла, импорт; progress-circle — доля в компактном месте: виджет, карточка.
- До 300 ms ничего не показываем — иначе экран мигает. Скелетон держим до прихода данных, затем контент проявляется за 560 ms (`duration/slow`). Дольше 10 секунд — объясняем, что происходит, и даём отменить.
- skeleton того же размера, что содержимое; только серые формы, без текста и иконок; при «Уменьшить движение» — без луча.
- spinner в кнопке заменяет текст, кнопка не меняет ширину. progress — один цвет, бренд; подпись с процентом — когда загрузка дольше нескольких секунд.

## Разметка
```html
<span class="of-spinner" data-size="m" role="status" aria-label="Загрузка"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="of-spinner__track" cx="50" cy="50"/><circle class="of-spinner__arc" cx="50" cy="50" pathLength="100"/></svg></span>
<span class="of-skeleton" data-type="title" style="width: 160px"></span>
<div class="of-progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="--value: 50%">
  <div class="of-progress__label"><span>Заполнение профиля</span><span class="of-progress__value">50%</span></div>
  <div class="of-progress__track"><div class="of-progress__bar"></div></div></div>
<span class="of-progress-circle" data-size="m" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="--value: 75%"><span>75%</span></span>
```

## Расхождения в Figma
1. Скорость вращения spinner в DS не задана — в коде `--of-spinner-turn: 1000ms` [Подтвердить]. Луч skeleton — 1200 ms, токена такой длительности нет.
2. Размеры spinner l 32 и xl 48, толщины колец, радиус полосы progress 999, внутренние радиусы progress-circle (75 / 79 / 83 %) — числами, не токенами.
