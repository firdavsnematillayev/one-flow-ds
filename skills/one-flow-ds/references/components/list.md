# list — list-item · user · definition-list · notification-item · tree-item · timeline-item

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `list`, 2026-11-17. Код: `.of-list-item`, `.of-user`, `.of-definition`, `.of-nmark`, `.of-notification`, `.of-notification-group`, `.of-tree` / `.of-tree-item`, `.of-timeline` в `assets/components.css`. Примеры в Figma: `.notifications example / list` `948:652`, `.tree example / structure` `949:825`, `.timeline example / employee history` `949:922`.

## list-item `742:219`
Свойства: `size` m · s; `state` default · hover · pressed · focus · selected · disabled; `Title`, `Description`, `Show description`, `Show icon`, `Icon`, `Show avatar`, `Show value`, `Value`, `Show control`, `Show chevron`.
- m: мин. высота 56, отступы `space/8 space/12`; s: 44, `space/6 space/12`. gap 12, `radius/m`.
- `[icon 24 label/secondary | avatar 36 (s — 28)] [text: Title web/body label/primary + Description web/subheadline label/secondary] [Value web/body label/secondary] [control — menu-control] [chevron-right 20]`.
- Фон: hover `surface/neutral/default` · pressed `surface/neutral/hover` · selected `surface/brand-subtle/default`. focus — рамка снаружи на 2, радиус 14, `outline/focus` + `focus/ring`. disabled — тексты и иконка `label/disabled`, аватар и control 50 %.

## user `742:241`
`size` s · m · l: аватар 28 / 36 / 44; gap 8 (s) или 12; Name `web/subheadline-medium` (s) или `web/body-medium`; Role `web/caption-1` (s) или `web/subheadline`, `label/secondary`.

## definition-item `943:281` · definition-list `943:324`
- Пара horizontal: отступы 10 сверху/снизу, gap 16; Label 180 `web/subheadline` `label/secondary`; Value `web/subheadline-medium` `label/primary`. stacked: gap 2, Label `web/caption-1`, Value `web/body-medium`.
- Карточка: отступы 24, `radius/xl`, `surface/default`, Title `web/headline`; rows — столбец пар (gap 8 под заголовком); grid — пары stacked в две колонки, gap 16, под заголовком 20.

## notification-mark `948:483`
- icon: круг 44, иконка 20; фон и иконка по тону: info `surface/info-subtle` + `label/info` · success · warning · danger — их `-subtle` + `label/*` · neutral `surface/neutral/default` + `label/secondary` · new `surface/signal-subtle` + `label/signal`.
- photo: аватар 44 + значок 20 в правом нижнем углу (выступает на 4), кольцо 2 снаружи `surface/default`, иконка 12 `label/inverse`: info `surface/info` + bell · success `surface/success-strong` + check · warning `surface/warning-strong` + clock · danger `surface/danger/default` + x · neutral `surface/inverse` + bubble-chat · new `surface/signal` + star (`label/on-signal`).

## notification-item `948:649` · notification-group-title `948:650`
- Строка: отступы 16, gap 12, линия снизу 1 px `outline/subtle`. `[mark 44] [body gap 4: head (Title web/subheadline-semibold + tag — badge s, gap 8) · Description web/footnote label/secondary · actions (отступ сверху 6, gap 8: button primary s + outline s, до трёх)] [Time web/caption-1 label/secondary]`.
- unread — `surface/default`, заголовок полужирный `label/primary`; read — `surface/page`, отметка 80 %, заголовок `web/subheadline` `label/secondary`. hover: unread `surface/neutral/default`, read `surface/neutral/hover`.
- Заголовок группы: отступы 12 16 8, `surface/default`, `web/subheadline-semibold`.

## tree-item `949:824`
Свойства: `type` collapsed · expanded · leaf; `state` default · hover · selected; `Label`, `Count`, `Show count`, `Show icon`, `Level 2`, `Level 3`.
Высота 40, отступы 0 12 0 8, gap 8, `radius/m`: `[уровни: пустые 24 на уровень] [chevron 16 label/secondary (лист — пусто)] [icon 20] [Label web/subheadline label/primary] [Count mono/caption-1 label/secondary]`. hover `surface/neutral/default`; selected `surface/brand-subtle/default`, всё `label/brand/on-subtle`, Label `web/subheadline-semibold`.

## timeline-item `949:921`
Ряд, gap 12: `[rail 20: marker 16 (точка 8) + линия 2 radius 1 outline/subtle, gap 4, отступ сверху 2] [body, отступ снизу 20, gap 2: Date mono/caption-1 label/secondary · Title web/subheadline-medium label/primary · Description web/footnote label/secondary]`.
done — точка `outline/control`; current — круг `surface/brand-subtle/default`, точка `surface/brand/brand`, Title `web/subheadline-semibold`; upcoming — точка `surface/default` с обводкой 1.5 `outline/control`, Title `label/secondary`. У последнего события линии нет.

## Правила (доска «list rules (DS2)» `1211:317`)
- list-item — строка: иконка или аватар, заголовок, описание, значение, шеврон; user — человек; definition-list — пары «название — значение» в карточке профиля и заявки; notification-item — уведомление; tree-item — иерархия (структура компании, папки); timeline-item — события по времени.
- list-item: m 56 — основной, s 44 — плотные списки в панелях. Шеврон — строка открывает страницу; без шеврона — выбирает или ничего не делает. Значение справа — цифры JetBrains Mono.
- Уведомления: непрочитанное — белый фон и полужирный заголовок, прочитанное — серый фон; цвет отметки — статус, а не тема; группы «Сегодня», «Вчера», «Ранее».
- Дерево: отступ 24 px на уровень, счётчик справа; не глубже трёх уровней на экране. История: даты слева моно-шрифтом, текущее событие выделено, у последнего нет линии вниз.

## Разметка
```html
<a class="of-list-item" href="/requests/1042"><span class="of-avatar" data-size="36" data-type="initials">ДН</span>
  <span class="of-list-item__text"><span class="of-list-item__title">Даниил Новак</span><span class="of-list-item__desc">Опоздал на 25 минут</span></span>
  <svg class="of-icon of-list-item__chevron"><use href="#i-chevron-right-line-20"/></svg></a>
<section class="of-definition"><h3 class="of-definition__title">Работа</h3><dl class="of-definition__items"><div class="of-definition__item"><dt>Должность</dt><dd>Ведущий дизайнер</dd></div></dl></section>
<div class="of-tree-item" role="treeitem" aria-expanded="false" data-level="2"><svg class="of-icon of-tree-item__chevron"><use href="#i-chevron-right-line-16"/></svg><span class="of-tree-item__label">Дизайн</span><span class="of-tree-item__count">6</span></div>
```
Остальное — в комментариях `components.css`.

## Расхождения в Figma
1. **Значение в list-item** — `web/body`; доска: «цифры JetBrains Mono». В коде `web/body` + выровненные цифры.
2. **Отступ уровня дерева:** доска — 24 px на уровень; в компоненте пустой блок 24 + gap 8 = 32. В коде — как в компоненте (32).
3. Радиус рамки фокуса list-item 14, радиусы отметки 22 и значка 10, отступы definition (10 / 16 / 24 / 20), notification (16 / 12 / 4 / 6), timeline и tree (8 / 12 / 20) — числами.
4. Иконки значка уведомления — рисунки 16, уменьшенные до 12.
