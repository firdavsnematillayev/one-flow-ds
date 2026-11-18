# section controls — toggle · checkbox · radio · selection · slider

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `section controls`, 2026-11-17. Код: `.of-toggle`, `.of-checkbox`, `.of-radio`, `.of-selection`, `.of-check` (подпись), `.of-slider` в `assets/components.css`.

Свойства у четырёх переключателей: `checked` false · true (у checkbox ещё indeterminate); `state` default · hover · focus · disabled.

## toggle `212:1586`
Дорожка 51 × 31, `radius/full`; кружок 27 в 2 px от края, белый, тень `shadow/xs`; включён — кружок справа.

| | выключен | включён |
|---|---|---|
| default | `surface/neutral-strong/default` | `surface/brand/brand` |
| hover | `surface/neutral-strong/hover` | `surface/brand/hover` |
| disabled | `surface/neutral/default` | `surface/brand/disabled` |

focus — кольцо снаружи на 4 px: обводка 2 `outline/focus` + `focus/ring`.

## checkbox `212:1605`
Квадрат 20 в области 24, `radius/xs`, обводка 1.5 inside `outline/control` (hover `outline/hover`, disabled `outline/disabled` + заливка `surface/neutral/default`).
Отмечен — заливка `surface/brand/brand` (hover `surface/brand/hover`, disabled `surface/disabled`) и `check` 16 `label/inverse` (disabled `label/disabled`). indeterminate — вместо галочки черта 10 × 2 `radius/full`.
focus — кольцо 28 (снаружи на 2 от области 24), `radius/s`.

## radio `212:1591`
Круг 20 в области 24, обводка 1.5 **снаружи** `outline/control` (hover `outline/hover`; disabled `outline/disabled` + `surface/neutral/default`). Отмечен — кольцо 4 inside `surface/brand/brand` (hover `surface/brand/hover`, disabled `outline/disabled`), середина пустая. focus — кольцо 28, круглое.

## selection `212:1599`
Круг 24, обводка 1.5 inside `outline/control`; отмечен — `surface/brand/brand` + `check` 16 `label/inverse`. hover / disabled — как у checkbox. focus — кольцо 32. Отметка пункта в списке или меню.

## slider `725:242`
Свойства: `type` single · range; `state` default · hover · pressed · focus · disabled; `Show label`, `Label`, `Value`, `Show scale`, `Min`, `Max`.
Столбец, gap 8: `[строка подписи: Label web/subheadline-medium label/primary ↔ Value web/subheadline label/secondary] [дорожка 20: линия 6 radius/full surface/neutral-strong/default + заливка surface/brand/brand + ползунок 20] [шкала: Min ↔ Max web/caption-1 label/tertiary]`.
Ползунок: круг 20 `surface/default`, обводка 2 inside цвета заливки, тень `shadow/sm`. hover — заливка `surface/brand/hover` + ореол 32 `surface/brand-subtle/default`; pressed — `surface/brand/pressed` + ореол 36 `surface/brand-subtle/hover`; focus — кольцо 28 `outline/focus` + `focus/ring`; disabled — `surface/brand/disabled`, ползунок без тени, тексты `label/disabled`.

## Правила (доска «section controls rules (DS2)» `1211:444`)
- toggle — включить или выключить, действует сразу, без кнопки «Сохранить»; checkbox — выбрать несколько, применяется кнопкой формы; radio — одно из 2–5, все видны сразу (больше пяти — select); slider — значение в диапазоне, где точность не важна (точное число — number-input).
- Подпись нажимается вместе с элементом. toggle — что включаем («Уведомления по почте», без «Включить»); checkbox — утверждение, с которым соглашаются.
- checkbox indeterminate — выбрана часть списка (шапка таблицы, группа). disabled — с пояснением рядом, почему нельзя.

## Разметка
```html
<label class="of-check"><input type="checkbox" class="of-toggle" role="switch" checked> Уведомления по почте</label>
<label class="of-check"><input type="checkbox" class="of-checkbox"> Согласен с правилами</label>
<label class="of-check"><input type="radio" class="of-radio" name="shift"> Утренняя смена</label>
<div class="of-slider" style="--to: 40%"><div class="of-slider__head"><span>Опоздание, минут</span><span class="of-slider__value">40</span></div>
  <div class="of-slider__track"><input type="range" class="of-slider__input" min="0" max="100" value="40" aria-label="Опоздание"></div></div>
```
indeterminate ставится скриптом: `el.indeterminate = true`. Заливку slider задают `--from` / `--to` (в процентах) — обновлять при вводе.

## Расхождения в Figma
1. Кружок toggle — белый `#ffffff` числом, без токена (в коде `palette/neutral/0`). В тёмной теме тоже белый — так задумано?
2. radio обведён **снаружи** (виден круг 23), checkbox и selection — внутри. В одном списке radio выглядит крупнее.
3. В radio скрытые слои привязаны к старым переменным `fill/elevation-2` и `fill/accent` (их нет среди ролей DS v2) и лежит скрытая галочка — мусор после переделки.
4. Ореолы и кольцо slider (32 / 36 / 28), размеры toggle 51 × 31 и кружка 27 — числами.
