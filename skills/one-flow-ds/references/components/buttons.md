# buttons — button · icon-button · button-group

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `buttons`, 2026-11-17 (`scripts/export-component.figma.js`).
Код: `assets/components.css` (`.of-button`, `.of-icon-button`), образцы и самопроверка: `assets/components-preview.html`.

## button `652:3960` (360 вариантов)

Свойства: `style` primary · tonal · neutral · neutral-strong · outline · danger; `size` xs · s · m · l · xl; `state` default · hover · pressed · focus · loading · disabled; `shape` default · round; `Label` (текст); `Icon left`, `Icon right` (замена иконки), `Show icon left`, `Show icon right`.

Анатомия (авто-лейаут по горизонтали, центр/центр, ширина по содержимому):
`[icon left] [label: padding 0 space/4 → Text] [icon right]`

| size | высота | отступ слева/справа | gap | радиус (default) | иконка | текст |
|---|---|---|---|---|---|---|
| xs | `control/xs` 24 | `space/6` | `space/2` | `radius/s` 8 | 16 | `web/subheadline-semibold` |
| s | `control/s` 32 | `space/8` | `space/2` | `radius/s` 8 | 20 | `web/subheadline-semibold` |
| m | `control/m` 36 | `space/12` | `space/4` | `radius/m` 12 | 20 | `web/subheadline-semibold` |
| l | `control/l` 44 | `space/16` | `space/4` | `radius/m` 12 | 24 | `web/body-semibold` |
| xl | `control/xl` 52 | `space/20` | `space/4` | `radius/l` 16 | 24 | `web/headline` |

`shape=round` → `radius/full`.

Цвет по стилю × состоянию (заливка · текст и иконки; иконка всегда цвета текста):

| style | default | hover | pressed | disabled |
|---|---|---|---|---|
| primary | `surface/brand/brand` · `label/inverse` | `surface/brand/hover` | `surface/brand/pressed` | `surface/disabled` · `label/disabled` |
| tonal | `surface/brand-subtle/default` · `label/brand/on-subtle` | `…/hover` | `…/pressed` | `surface/disabled` · `label/disabled` |
| neutral | `surface/neutral/default` · `label/primary` | `surface/neutral/hover` | `surface/neutral/pressed` | `surface/disabled` · `label/disabled` |
| neutral-strong | `surface/neutral-strong/default` · `label/primary` | `…/hover` | `…/pressed` | `surface/disabled` · `label/disabled` |
| outline | без заливки, обводка 1.5 inside `outline/brand` · `label/brand/strong` | `surface/ghost/hover` | `surface/ghost/pressed` | без заливки, обводка `outline/disabled` · `label/disabled` |
| danger | `surface/danger/default` · `label/inverse` | `surface/danger/hover` | `surface/danger/pressed` | `surface/disabled` · `label/disabled` |

- **focus** — заливка как default + кольцо: прямоугольник снаружи на 4 px (зазор 2 + кольцо 2 inside), радиус = радиус кнопки + 4 (xs/s 12, m/l 16, xl 20, round — full), обводка 2 px `outline/focus` (у outline — `outline/brand`, у danger — `outline/danger`), эффект `focus/ring`.
- **loading** — содержимое прозрачно (ширина не меняется), по центру иконка `loader-2` цвета текста: xs 16, s/m 20, l/xl 24; нажать нельзя.

## icon-button `698:7062` (240 вариантов)

Свойства: `style` primary · tonal · neutral · outline · ghost · danger; `size` xs · s · m · l; `state` default · hover · pressed · focus · disabled; `shape`; `Icon`.

| size | квадрат | радиус | иконка |
|---|---|---|---|
| xs | 24 | `radius/s` | 16 |
| s | 32 | `radius/s` | 20 |
| m | 36 | `radius/m` | 20 |
| l | 44 | `radius/m` | 24 |

Цвета — как у button; **ghost**: без заливки, иконка `label/secondary`; hover `surface/neutral/default` + `label/primary`; pressed `surface/neutral/hover` + `label/primary`; disabled — без заливки, `label/disabled`. Кольцо фокуса — как у button.

## button-group `736:7551`
`type` text · icon · split; `size` s · m · l. Внешние углы — по размеру кнопки, внутренние — `radius/xs`. Для выбора одного варианта — `segmented`, не button-group. (В коде пока не сверстан.)

## Правила (доска «buttons rules (DS2)» `1209:176`)
- primary — главное действие блока или окна, одно на блок; tonal — второе по важности и выбранное состояние кнопок-фильтров; neutral / neutral-strong — «Отмена», «Назад», «Экспорт»; outline — второстепенное на сером фоне; danger — удаление и необратимые действия, в окне подтверждения; ghost (icon-button) — иконки в таблицах, шапках, карточках.
- Размер: xs 24 — в строках таблицы 44; s 32 — строки 56, карточки, тосты; m 36 — основной в вебе (шапка страницы, панели); l 44 — окна, шторки, мобильный; xl 52 — крупные призывы (пустые состояния, вход).
- Форма: default — шапка страницы, таблицы, панели; round — окна, шторки, тосты, карточки. В одном блоке кнопки одной формы и одного размера.
- Главная кнопка справа, «Отмена» слева от неё. Текст — глагол и объект: «Сохранить изменения», не «ОК», не «Да». Иконка — только если помогает узнать действие; одна, слева.
- loading — ширина не меняется, повторное нажатие невозможно. disabled — только когда понятно, почему нельзя; иначе кнопка активна и при нажатии показывает, что исправить. focus — кольцо только при работе с клавиатуры.
- icon-button — всегда с подсказкой (tooltip); «Ещё действия» — горизонтальное троеточие; зона нажатия не меньше 24 px в вебе и 44 px в мобильном.

## Разметка
```html
<button class="of-button" data-style="primary" data-size="m" data-shape="round">
  <svg class="of-icon"><use href="#i-plus-line-20"/></svg><span class="of-button__label">Добавить сотрудника</span>
</button>
<button class="of-button" data-style="neutral" data-size="l" aria-busy="true"><span class="of-button__label">Сохранить</span></button>
<button class="of-icon-button" data-style="ghost" data-size="m" aria-label="Ещё действия" title="Ещё действия">
  <svg class="of-icon"><use href="#i-dots-line-20"/></svg>
</button>
```
Без `data-style` — primary, без `data-size` — m. Размер иконки задаёт кнопка; в `use` брать рисунок того же размера (16 / 20 / 24).

## Расхождения в Figma (не исправлены — решение владельца DS)
Исправлено 2026-11-17 (решение владельца DS): у `tonal · disabled` удалены две лишние внутренние тени; `neutral · disabled` (button и icon-button) переведён на `surface/disabled`, как у остальных стилей; `surface/danger/default` теперь `palette/danger/fill` #DC3045 — белый текст на нём 4.62:1 (было 4.23:1, ниже AA).

3. Кольцо фокуса `xl` — радиус 20 числом, не токеном (у остальных размеров — токены `radius/m`, `radius/l`).
4. Доска правил: «default — прямоугольник 12 px», но у xs и s радиус 8 (`radius/s`).
5. Скорость вращения спиннера в DS не задана — в коде `--of-spinner-turn: 1000ms` [Подтвердить].
