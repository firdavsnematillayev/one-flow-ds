# tooltips — tooltip · popover · popconfirm

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `tooltips`, 2026-11-17. Код: `.of-tooltip`, `.of-popover`, `.of-popconfirm` в `assets/components.css`.

## tooltip `212:1632` (16 вариантов)
Свойства: `placement` top-start · top · top-end · bottom-start · bottom · bottom-end · left · right; `tone` light · dark; `Text`; `Show arrow`.
Тело: отступы `space/8 space/12`, `radius/s`, текст `web/subheadline-medium`; тень `shadow/md`.
- light — `surface/elevated`, текст `label/primary`; dark — `surface/inverse`, текст `label/inverse`.
- Стрелка — скруглённый треугольник 11 × 10 цвета тела, выступает на 6 px и смотрит на элемент: top-* — снизу тела, bottom-* — сверху, left — справа, right — слева. -start / -end — центр стрелки в 20 px от края, без суффикса — по центру.

## popover `704:550`
Свойства: `arrow` none · top · bottom; `Title`, `Description`, `Show close`, `Show actions`.
Ширина 320, отступы `space/16 space/20`, gap `space/6`, `radius/xl`, `surface/elevated`, тень `shadow/lg`.
`[header: Title web/body-medium label/primary · close icon-button ghost xs round] [Description web/subheadline label/secondary] [actions: отступ сверху 10, gap space/8: button primary s round + neutral-strong s round]`.
Стрелка — острый треугольник 18 × 9 `surface/elevated` по центру: top — над панелью (панель под элементом), bottom — под панелью.

## popconfirm `328:1357`
Ширина 254, отступы `space/16 space/12 space/12`, gap `space/16`, `radius/xl`, `surface/elevated`, тень `shadow/lg`, всё по центру.
`[content gap space/12: круг 56 surface/brand-subtle/default с help-circle 24 label/brand/strong · text gap space/2: Title web/body-medium label/primary, Description web/subheadline label/secondary] [actions столбцом gap space/6: button primary m + neutral-strong m на всю ширину, форма default]`.
Стрелка — скруглённый треугольник сверху по центру (popconfirm стоит под кнопкой).

## Правила (доска «tooltips rules (DS2)» `1209:292`)
- tooltip — короткое пояснение к иконке или обрезанному тексту, при наведении и фокусе; popover — несколько строк, заголовок, действия, по нажатию; popconfirm — быстрое подтверждение на месте: «Удалить строку?».
- tooltip: до одной строки, без точки; только дополнительная информация — без подсказки интерфейс понятен; не ставим на кнопки с текстом; появление 200 ms (`duration/quick`), без задержки при переходе между соседними иконками.
- popover: закрывается крестиком, Esc и кликом вне; одно главное действие, не больше двух кнопок; стрелка — когда рядом несколько элементов и надо показать, к чему относится.
- popconfirm — только для действий, которые легко повторить. Необратимое удаление — через dialog.
- tone tooltip (из описания): light — на цветном или тёмном фоне и рядом с белыми поверхностями с тенью; dark — на белом фоне.

## Разметка
```html
<button class="of-icon-button" data-style="ghost" aria-label="Скачать отчёт" aria-describedby="tip-1">…</button>
<div class="of-tooltip" role="tooltip" id="tip-1" data-placement="top" data-tone="dark">Скачать отчёт</div>
```
popover и popconfirm — полная разметка в `components.css`. Положение рядом с элементом задаёт приложение.

## Расхождения в Figma
1. У tooltip, popover, popconfirm, toast есть обводка `outline/elevated` с прозрачностью 0 % — её не видно ни в одной теме. Нужна ли граница (например, в тёмной теме)? В коде её нет.
2. **popconfirm.** Описание: «для необратимых действий основную кнопку переключить на danger». Доска: «только для действий, которые легко повторить; необратимое удаление — через dialog».
3. Ширины popover 320 и popconfirm 254, отступ над кнопками 10, наложение стрелок (gap −7 / −1) — числами.
4. Тень tooltip `shadow/md` в Figma ложится на тело вместе со стрелкой; в коде — только на тело.
