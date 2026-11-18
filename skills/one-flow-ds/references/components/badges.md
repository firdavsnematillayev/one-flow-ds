# badges — badge · counter · status

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `badges`, 2026-11-17. Код: `.of-badge`, `.of-counter`, `.of-status` в `assets/components.css`.

## badge `186:811` (52 варианта)
Свойства: `appearance` subtle · solid; `tone` neutral · brand · info · success · warning · danger · signal; `size` s · m; `type` label · icon-only; `Label`, `Show icon`, `Icon`.
Пилюля `radius/full`, текст по центру, отступы: корень + label (`0 space/4`).

| size | высота | отступ корня | текст | icon-only |
|---|---|---|---|---|
| s | `control/xs` 24 | `space/6` | `web/caption-1` | квадрат 24, иконка 16 |
| m | `control/s` 32 | `space/8` | `web/subheadline-medium` | квадрат 32, иконка 16 |

| tone | subtle: фон · текст | solid: фон (текст `label/inverse`) |
|---|---|---|
| neutral | `surface/neutral/default` · `label/secondary` | `surface/inverse` |
| brand | `surface/brand-subtle/default` · `label/brand/on-subtle` | `surface/brand/brand` |
| info | `surface/info-subtle` · `label/info` | `surface/info-strong` |
| success | `surface/success-subtle` · `label/success` | `surface/success-strong` |
| warning | `surface/warning-subtle` · `label/warning` | `surface/warning-strong` |
| danger | `surface/danger-subtle` · `label/danger` | `surface/danger/default` |
| signal | `surface/signal-subtle` · `label/signal` | — (solid нет) |

Иконка слева 16, цвет текста. Не нажимается.

## counter `687:254`
Свойства: `tone` danger · brand · neutral · signal; `size` s · m; `type` count · dot; `Count`.
- count: s — высота 16, мин. ширина 16, отступы 0 4, `mono/caption-2`; m — 20, мин. 20, отступы 0 6, `mono/caption-1-medium`. Текст `label/inverse` (signal — `label/on-signal`).
- dot: круг 6 (s) / 8 (m), без числа — «есть новое».
- Фон: danger `surface/danger/default` · brand `surface/brand/brand` · neutral `surface/inverse` · signal `surface/signal`.

## status `743:246`
Свойства: `tone` neutral · brand · info · success · warning · danger; `size` m · s; `Label`, `Show label`.
Точка + слово: m — точка 8, gap 8, `web/subheadline`; s — 6, gap 6, `web/caption-1`. Текст `label/primary`. Точка: neutral `label/tertiary` · brand `surface/brand/brand` · info `surface/info` · success `surface/success` · warning `surface/warning` · danger `surface/danger/default`.

## Правила (доска «badges rules (DS2)» `1211:385`)
- badge — короткая метка: «Черновик», «Новое», роль, тип; counter — число: непрочитанные, количество; status — состояние объекта: точка + слово.
- subtle — по умолчанию; solid — только когда метка главная в строке (не больше одного-двух на экран).
- signal (Spark) — только «Новое / Скоро» и счётчик-сигнал, до 24 px, только на светлом; на тёмном сам становится Sky. Не заливка, не кнопка.
- Статус — всегда точка или иконка + слово; цвет без слова не используется.
- counter: на колокольчике — число непрочитанных, красный (danger); больше 99 — «99+»; ноль — не показываем.
- Текст: одно-два слова, с заглавной, без точки.

## Разметка
```html
<span class="of-badge" data-tone="warning"><svg class="of-icon"><use href="#i-clock-solid-16"/></svg>Ждёт</span>
<span class="of-badge" data-tone="success" data-appearance="solid" data-size="m">Одобрено</span>
<span class="of-counter">3</span> <span class="of-counter" data-type="dot" aria-label="Есть новое"></span>
<span class="of-status" data-tone="warning">На согласовании</span>
```

## Расхождения в Figma
1. Отступы counter (4 / 6), точки status (8 / 6) и gap (8 / 6) — числами, не токенами.
