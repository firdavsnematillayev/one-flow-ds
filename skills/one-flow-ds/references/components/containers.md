# containers — drawer · accordion

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `containers`, 2026-11-17. Код: `.of-drawer`, `.of-accordion` в `assets/components.css`.

## drawer `714:128`
Свойства: `size` s 400 · m 560; `Title`, `Description`, `Show description`, `Show back`, `Show footer`.
Столбец, `radius/xl`, `surface/default`, тень `shadow/xl`, высота по экрану.
- **header:** отступы `space/16`, gap `space/12`, по центру: `[back — icon-button neutral l round (скрыт)] [titles gap space/2: Title web/title-3 label/primary · Description web/subheadline label/secondary] [close — icon-button neutral l round, x 24]`.
- **body:** отступы `0 space/16`, растягивается; в компоненте — серый блок-место `surface/neutral/default` `radius/l`, заменяется своим содержимым.
- **footer:** отступы `space/16`, gap `space/8`, кнопки справа: neutral-strong l round, primary l round.

## accordion-item `714:162` · accordion `714:163`
- Пункт: отступы `space/16`, gap `space/8`, `radius/l`, `surface/default`. Шапка: Title `web/body-medium` `label/primary` + шеврон 20 `label/secondary` справа (gap `space/12`); раскрыт — `chevron-up` и под шапкой Content `web/subheadline` `label/secondary`.
- state: hover — `surface/neutral/default` · disabled — Title и шеврон `label/disabled`.
- Аккордеон: пункты столбцом, gap `space/8`.

## Правила (доска «containers rules (DS2)» `1211:271`)
- drawer — подробности или форма рядом со списком, когда список должен оставаться виден. s 400 — просмотр и короткая форма; m 560 — длинная форма, панель фильтров. Выезжает справа за 320 ms, закрывается крестиком, Esc, кликом по фону. Окно (modal) — когда задача отдельная и список не нужен.
- accordion — длинная страница с разделами, из которых нужен один-два: справка, настройки. Заголовок пункта — то, что внутри: «Отпуск и больничные». Несколько пунктов могут быть открыты одновременно. Не прячем в аккордеон то, что нужно всем и всегда; 2–3 коротких раздела — показать сразу.
- Поверхности: большие (шторка, окно) — `surface/default`; маленькие всплывающие (меню, поповер, тост) — `surface/elevated`.

## Разметка
```html
<aside class="of-drawer" data-enter role="dialog" aria-modal="true" aria-labelledby="dr-t">
  <div class="of-drawer__header"><div class="of-drawer__titles"><h2 class="of-drawer__title" id="dr-t">Объяснительная</h2><p class="of-drawer__desc">Опоздание 17 ноября, 09:40</p></div>
    <button class="of-icon-button" data-style="neutral" data-size="l" data-shape="round" aria-label="Закрыть"><svg class="of-icon"><use href="#i-x-line-24"/></svg></button></div>
  <div class="of-drawer__body">…поля…</div>
  <div class="of-drawer__footer"><button class="of-button" data-style="neutral-strong" data-size="l" data-shape="round">Отмена</button><button class="of-button" data-size="l" data-shape="round">Отправить</button></div></aside>
<div class="of-accordion"><details class="of-accordion__item" open><summary class="of-accordion__head">Отпуск и больничные<svg class="of-icon"><use href="#i-chevron-down-line-20"/></svg></summary>
  <div class="of-accordion__content">…</div></details></div>
```
Положение drawer (справа, на всю высоту, отступ от края) и фон `surface/scrim` под ним задаёт приложение; `data-enter` включает въезд за `duration/base` с `easing/flow`.

## Расхождения в Figma
1. drawer скруглён со всех сторон (`radius/xl`), хотя выезжает от правого края; отступ от края экрана в DS не задан.
2. Обводка `outline/elevated` 0 % у drawer — невидимая (как у всплывающих поверхностей).
3. Шеврон accordion — рисунок 24, уменьшенный до 20 (в коде родной 20).
