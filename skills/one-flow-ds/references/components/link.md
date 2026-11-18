# link & divider — link · divider

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `link & divider`, 2026-11-17. Код: `.of-link`, `.of-divider` в `assets/components.css`.

## link `698:8444` (16 вариантов)
Свойства: `tone` brand · neutral; `size` sm · md; `state` default · hover · focus · disabled; `Label`; `Icon`, `Show icon` (иконка справа, например `external-link` — «откроется в новой вкладке»).
Анатомия: горизонтально, gap `space/4`, радиус `radius/xs`; иконка 16.
**Опубликованная версия (2026-11-17, решение владельца DS):** во всех 16 вариантах Label `web/body-medium` 16 и **всегда подчёркнут**; размеры sm и md сейчас одинаковые (32 × 24).

| tone | default | hover | focus | disabled |
|---|---|---|---|---|
| brand | `label/brand/brand` | `label/brand/strong` | как default + кольцо | `label/disabled` |
| neutral | `label/secondary` | `label/primary` | как default + кольцо | `label/disabled` |

На цветной плашке и сером фоне (alert, upload-area) текст ссылки — `label/brand/strong`: у `label/brand/brand` там контраст ниже 4.5:1. В коде — автоматически внутри `.of-alert__action`, `.of-upload` и контейнера с классом `.of-on-tint`.

Кольцо фокуса: снаружи на 3 px, обводка 2 `outline/focus` inside, радиус 6, эффект `focus/ring`.

## divider `698:8453`
Свойства: `orientation` horizontal · vertical; `label` false · true; `Label`.
Линия 1 px `outline/subtle`; horizontal растягивается по ширине, vertical — по высоте. С подписью: `[линия] Label [линия]`, gap `space/12`, Label `web/caption-1` `label/tertiary`.

## Правила (доска «link & divider rules (DS2)» `1211:106`)
- Ссылка ведёт куда-то (страница, раздел, наружу); кнопка что-то делает (сохраняет, удаляет, открывает окно). Внутри текста — только ссылка.
  В DS вид ссылки есть и у нескольких действий на месте: «Сбросить» в filter-bar, «Показать ещё» в таблице. В коде это `<button type="button" class="of-link">` — выглядит как ссылка, работает как кнопка (клавиатура, экранный диктор).
- brand — отдельная ссылка, «Подробнее», «Все приложения»; neutral — в сером тексте и подписях. sm — в подписях и таблицах, md — в тексте.
- Текст ссылки называет, куда ведёт: «Правила посещаемости», не «здесь». Внешний сайт — иконка «наружу» и новая вкладка; страницы портала — та же вкладка.
- divider делит группы внутри одного блока: пункты меню, секции формы, строки. Между карточками не нужен — их разделяет отступ. С подписью — когда группе нужен заголовок: «Сегодня», «Ранее».

## Разметка
```html
<a class="of-link" href="/requests/1042">Открыть заявку</a>
<a class="of-link" data-tone="neutral" data-size="md" href="…" target="_blank">Регламент <svg class="of-icon"><use href="#i-external-link-line-16"/></svg></a>
<div class="of-divider" role="separator"></div>
<div class="of-divider" role="separator">Сегодня</div>
<div class="of-divider" data-orientation="vertical" role="separator"></div>
```

## Расхождения в Figma
1. **Описание компонента устарело:** в нём «size: sm 14 · md 16» и «brand — подчёркивание при наведении», а опубликованные варианты — все 16 px и всегда подчёркнуты. Доска правил тоже говорит «sm — в подписях и таблицах, md — в тексте» и «brand подчёркивается при наведении».
2. Экземпляры link в upload-area и alert остались с переопределением: 14 px и без подчёркивания (видно в Figma).
3. Радиус кольца фокуса 6 — числом, не токеном.
4. Иконка `external-link` — рисунок 24, уменьшенный до 16 (в коде — родной рисунок 16).
