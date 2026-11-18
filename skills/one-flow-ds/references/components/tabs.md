# tabs — tab · tabs · segmented-item · segmented

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `tabs`, 2026-11-17. Код: `.of-tabs` / `.of-tab`, `.of-segmented` / `.of-segmented__item` в `assets/components.css`.

## tab `212:1618` · tabs `689:170`
Свойства tab: `size` m · s; `selected` false · true; `state` default · hover · focus · disabled; `Label`, `Icon left` (20), `Show icon left`, `Show counter`, `Count`.
- Высота: m `control/l` 44, отступы `0 space/16`; s `control/m` 36, `0 space/12`. gap `space/8`. Текст `web/subheadline-medium`.
- Текст: default `label/secondary` · hover `label/primary` · disabled `label/disabled`; выбрана — `label/brand/brand` (hover `label/brand/strong`) и линия 2 px снизу inside `outline/brand` (disabled — `outline/disabled`).
- Счётчик: высота 20, мин. 20, отступы `0 space/6`, `radius/full`, `web/caption-1`: `surface/neutral-strong/default` + `label/secondary`; у выбранной — `surface/brand-subtle/default` + `label/brand/on-subtle`; disabled — `surface/disabled` + `label/disabled`.
- focus — рамка внутри вкладки (отступ 4 сверху/снизу, 2 по бокам), радиус 8, обводка 2 `outline/focus` + `focus/ring`.
- tabs: вкладки в ряд без промежутков, под ними общая линия 1 px `outline/subtle`.

## segmented-item `711:225` · segmented `711:397`
- Контейнер: отступы `space/4`, gap `space/2`, `radius/full`, `surface/neutral/default`; высота m 36 · l 44.
- Сегмент: m — высота 28, отступы `0 space/12`, иконка 16, `web/subheadline-medium`; l — 36, `0 space/16`, иконка 20, `web/body-medium`. gap `space/6`, `radius/full`.
- Текст: default `label/secondary` · hover `label/primary` · disabled `label/disabled`; selected — белая пилюля `surface/segmented/thumb` + `shadow/sm`, текст `label/primary`.

## Правила (доска «tabs rules (DS2)» `1211:416`)
- tabs — разные разделы одного объекта: «Профиль», «Документы», «История»; segmented — 2–4 вида одних и тех же данных: «День / Неделя / Месяц», «Таблица / График».
- Переключение не прокручивает страницу и не перезагружает её. Выбранная вкладка сохраняется в адресе страницы — ссылкой можно поделиться. Счётчик во вкладке — сколько объектов внутри.
- Текст: одно-два слова, существительное; вкладки примерно одной длины.
- Нельзя: вкладки внутри вкладок; больше 6 вкладок (разбить раздел или боковое меню); segmented для действий — он только переключает вид.

## Разметка
```html
<div class="of-tabs" role="tablist" aria-label="Сотрудник">
  <button class="of-tab" role="tab" aria-selected="true">Профиль</button>
  <button class="of-tab" role="tab" aria-selected="false">Документы<span class="of-tab__count">3</span></button></div>
<div class="of-segmented" role="radiogroup" aria-label="Период">
  <button class="of-segmented__item" role="radio" aria-checked="true">День</button><button class="of-segmented__item" role="radio" aria-checked="false">Неделя</button></div>
```

## Расхождения в Figma
1. Доска: segmented — «2–4 вида»; описание компонента — «2–5».
2. Радиус рамки фокуса вкладки 8 — числом; высота сегмента m 28 — не токен размера.
3. Иконка вкладки — рисунок 24, уменьшенный до 20.
