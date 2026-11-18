# feedback — alert · toast · undo-toast · empty-state

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `feedback`, 2026-11-17. Код: `.of-alert`, `.of-toast`, `.of-undo-toast`, `.of-empty` в `assets/components.css`.

Тон (общий для alert и toast):

| tone | фон (alert) / круг (toast) | иконка solid 20 | цвет иконки |
|---|---|---|---|
| info | `surface/info-subtle` | `info-circle` | `label/info` |
| success | `surface/success-subtle` | `circle-check` | `label/success` |
| warning | `surface/warning-subtle` | `alert-triangle` | `label/warning` |
| danger | `surface/danger-subtle` | `alert-circle` | `label/danger` |
| neutral | `surface/neutral/default` | `info-circle` | `label/secondary` |

## alert `703:356` (10 вариантов)
Свойства: `size` m · s; `tone`; `Title`, `Description`, `Show description`, `Show action`, `Show close`, `Show icon`.
- **m:** отступы `space/16`, gap `space/12`, `radius/l`, по верху. `[icon 20] [content gap space/2: Title web/subheadline-medium label/primary · Description web/subheadline label/secondary · action: link brand sm, текст `label/brand/strong`, отступ сверху 8] [close: icon-button ghost xs round, x 16]`.
- **s:** одна строка, мин. высота 44, отступы `space/8 space/12`, `radius/m`, по центру; `[icon] [Title] [link]`, без описания.

## toast `703:559` (5 вариантов)
Свойства: `tone`; `Title`, `Description`, `Time`, `Show description`, `Show time`, `Show actions`, `Show close`.
Ширина 380, отступы `space/16`, gap `space/12`, `radius/xl`, `surface/elevated`, тень `shadow/lg`. Тон — только круг 36 слева с иконкой 20.
`[content gap space/2: title row gap space/8 (Title web/body-medium label/primary · Time web/caption-1 label/tertiary) · Description web/subheadline label/secondary · actions: отступ сверху 10, gap space/8, button tonal s round + neutral-strong s round] [close ghost xs]`.

## undo-toast `762:1115`
Ширина 360, отступы 10 8 12 20, gap 12, `radius/l`, `surface/elevated`, `shadow/lg`. `[Title web/subheadline-medium] [button tonal s round «Отменить»] [close ghost s round, x 20]`; снизу полоса 3 px `surface/brand/brand`, за 5 секунд убывает до нуля; на наведении и фокусе таймер стоит. Один за раз, снизу по центру.

## empty-state `711:2540`
Свойства: `size` m · l; `Title`, `Description`, `Show description`, `Show action`, `Show secondary`, `Icon`.

| | m (в карточке, таблице, виджете) | l (на всю страницу) |
|---|---|---|
| gap | `space/16` | `space/24` |
| круг | 56, иконка 24 | 80, иконка 32 |
| Title | `web/body-medium` | `web/title-3` |
| Description | `web/subheadline` | `web/body` |
| кнопки | s round | m round |

Круг `surface/neutral/default`, иконка `label/secondary`; текст по центру, gap `space/4`; Title `label/primary`, Description `label/secondary`; кнопки: primary + neutral, gap `space/8`.

## Правила (доска «feedback rules (DS2)» `1211:172`)
- alert — состояние на странице или в форме, пока оно действует; toast — результат действия («Заявка отправлена»), исчезает сам; undo-toast — действие уже выполнено, 5 секунд можно отменить; empty-state — в списке или разделе пока ничего нет.
- Статус всегда иконка + слово; danger — только когда что-то не получилось или потеряется; цвет не единственный признак.
- Текст: сначала что случилось, потом что делать: «Не удалось загрузить файл. Проверьте размер — до 10 МБ — и загрузите ещё раз». Без «Ошибка!», «Внимание!» и восклицательных знаков.
- toast: снизу по центру, один за раз, новый заменяет старый; исчезает через 5 секунд, на наведении и фокусе таймер стоит; с ошибкой не исчезает сам — пока не закроют. Ошибки в форме — alert рядом с полем.
- empty-state: что здесь появится и как это сделать: «Заявок пока нет. Создайте первую». Одна главная кнопка; нет действия — без кнопки. Пусто по фильтру: «Ничего не найдено» + «Сбросить фильтры».

## Разметка
```html
<div class="of-alert" data-tone="warning" role="status"><svg class="of-icon of-alert__icon"><use href="#i-alert-triangle-solid-20"/></svg>
  <div class="of-alert__content"><span class="of-alert__title">У 3 сотрудников нет отметки ухода</span><span class="of-alert__text">Проверьте их смены, прежде чем закрыть табель.</span></div></div>
<div class="of-toast" data-tone="success" role="status"><span class="of-toast__badge"><svg class="of-icon"><use href="#i-circle-check-solid-20"/></svg></span>
  <div class="of-toast__content"><div class="of-toast__head"><span class="of-toast__title">Заявка отправлена</span><time class="of-toast__time">сейчас</time></div></div>
  <button class="of-icon-button" data-style="ghost" data-size="xs" data-shape="round" aria-label="Закрыть"><svg class="of-icon"><use href="#i-x-line-16"/></svg></button></div>
```
undo-toast и empty-state — разметка в `components.css`.

## Расхождения в Figma
1. **Где и сколько живёт toast.** Описание: «в углу, исчезает через 4–6 секунд». Доска: «снизу по центру, через 5 секунд; с ошибкой не исчезает сам».
2. Обводка `outline/elevated` 0 % у toast и undo-toast — невидимая (см. `tooltips.md`).
3. Отступы undo-toast (10 8 12 20) и gap 12, отступ над кнопками toast 10, ширины 380 / 360, полоса 3 — числами.
4. empty-state l — иконка 24, увеличенная до 32.
