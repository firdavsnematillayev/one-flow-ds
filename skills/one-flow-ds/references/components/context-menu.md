# context menu — menu · menu-item · menu-control · menu-divider

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `context menu`, 2026-11-17. Код: `.of-menu`, `.of-menu__item`, `.of-menu__divider` в `assets/components.css`. Примеры в Figma: `.menu example / settings` `750:1116`, `.menu example / columns` `750:1157`.

## menu `674:372`
Ширина 256, отступы `space/6`, `radius/m`, `surface/elevated`, тень `shadow/lg`; пункты столбцом без промежутков, группы разделяет menu-divider.

## menu-item `674:369`
Свойства: `tone` default · danger; `state` default · hover · focus · disabled; `Label`, `Icon left`, `Show icon left`, `Description`, `Show description`, `Show trailing`, `Show chevron`.
Мин. высота 44, отступы `10 space/12`, gap `space/8`, `radius/s`.
`[icon 20 цвета текста] [text: Label web/body + Description web/subheadline label/secondary] [trailing — menu-control] [chevron-right 20 — подменю]`.

| | default | danger |
|---|---|---|
| текст и иконка | `label/primary` | `label/danger` |
| hover | `surface/elevated-hover` | `surface/danger-subtle` |
| focus | обводка 2 inside `outline/focus` + `focus/ring` | обводка `outline/danger` |
| disabled | `label/disabled` (и описание) | `label/disabled` |

## menu-control `741:709` · menu-divider `674:370`
- menu-control: `type` checkbox · radio · toggle, `checked` — экземпляр checkbox / radio (24) или toggle (51 × 31) из section controls.
- menu-divider: отступы `space/4` сверху и снизу, линия 1 px `outline/subtle`.

## Правила (доска «context menu rules (DS2)» `1211:292`)
- Список действий или вариантов по кнопке: «Ещё», профиль, выбор в поле. До 7 пунктов без прокрутки; больше — группы с разделителями или поиск сверху.
- Текст — глагол: «Скопировать ссылку», «Удалить». Иконка слева — у всех пунктов или ни у одного. Описание — когда последствие неочевидно. Справа — флажок, переключатель или радио, если пункт меняет настройку.
- Частые действия сверху, удаление — последним, красным, после разделителя. Недоступный пункт — серым, если его ждут здесь; иначе скрываем.
- Открывается за 200 ms (Pop in), закрывается кликом вне, Esc, выбором пункта. Стрелки ↑ ↓ двигают выбор, Enter — выполняет.

## Разметка
```html
<div class="of-menu" role="menu" aria-label="Действия с заявкой">
  <button class="of-menu__item" role="menuitem"><svg class="of-icon"><use href="#i-copy-line-20"/></svg><span class="of-menu__text"><span class="of-menu__label">Скопировать ссылку</span></span></button>
  <label class="of-menu__item" role="menuitemcheckbox" aria-checked="true"><span class="of-menu__text"><span class="of-menu__label">Отдел</span></span><input type="checkbox" class="of-checkbox" checked></label>
  <div class="of-menu__divider" role="separator"></div>
  <button class="of-menu__item" role="menuitem" data-tone="danger"><svg class="of-icon"><use href="#i-trash-line-20"/></svg><span class="of-menu__text"><span class="of-menu__label">Удалить заявку</span></span></button></div>
```

## Расхождения в Figma
1. Отступ пункта сверху/снизу 10 — числом.
2. Иконка пункта по умолчанию — рисунок 24, уменьшенный до 20.
