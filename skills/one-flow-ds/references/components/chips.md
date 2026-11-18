# chips — chip

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `chips`, 2026-11-17. Код: `.of-chip` в `assets/components.css`.

## chip `212:1553` (32 варианта)
Свойства: `size` m · xs; `type` label · icon-only; `selected` false · true; `state` default · hover · focus · disabled; `Label`, `Icon left`, `Icon right`, `Show icon left`, `Show icon right`.
Пилюля `radius/full`, gap `space/2`, текст `web/subheadline-medium` в обёртке с отступами `0 space/4`; иконки по краям 16.

| size | высота | отступ корня | icon-only |
|---|---|---|---|
| m | `control/m` 36 | `space/12` | 36 × 36 |
| xs | `control/xs` 24 | `space/8` | 24 × 24 |

| | не выбран: фон · текст | выбран: фон · текст |
|---|---|---|
| default | `surface/neutral/default` · `label/secondary` | `surface/brand/brand` · `label/inverse` |
| hover | `surface/neutral/hover` · `label/primary` | `surface/brand/hover` · `label/inverse` |
| disabled | `surface/neutral/default` · `label/disabled` | `surface/brand-subtle/default` · `label/brand/disabled` |

focus — кольцо снаружи на 4 px, `radius/full`, обводка 2 `outline/focus` + `focus/ring`.

## Правила (доска «chips rules (DS2)» `1211:358`)
- Выбор одного или нескольких значений прямо на экране: категории, быстрый выбор. Чип не кнопка: не запускает действие, а выбирает; повторное нажатие снимает выбор.
- m — на странице и в панелях; xs — внутри полей и строк таблиц (выбранные значения в multi-select — xs).
- Применённый фильтр — filter-chip с крестиком (страница filters), не этот чип.
- Текст: одно-два слова, без глаголов.

## Разметка
```html
<button class="of-chip" type="button" aria-pressed="true"><svg class="of-icon"><use href="#i-check-line-16"/></svg>Отпуск</button>
<button class="of-chip" type="button" aria-pressed="false" data-size="xs">Больничный</button>
```
Выбор — `aria-pressed`. Для выбора одного из нескольких — группа с `role="radiogroup"` и `aria-checked` (стили те же через `aria-pressed`).

## Расхождения в Figma
1. Радиус кольца фокуса 999 — числом (у остальных компонентов — `radius/full`).
