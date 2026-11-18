# inputs — input · input-outline · textarea · caption-container · select

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `inputs`, 2026-11-17 (`scripts/export-component.figma.js`).
Код: `assets/components.css` (`.of-field` = input-field, `.of-input` + `data-type="number|multi|phone"`, `.of-search`, `.of-textarea`, `.of-caption`, `.of-select-menu`, `.of-select-option`, `.of-pin`, `.of-upload`, `.of-upload-item`), образцы и сверка: `assets/components-preview.html`.
Пароль и время (`.example / password and time`) — обычный input с иконкой `eye` / `clock` справа.

## input `636:373` (серый) и input-outline `636:385` (с обводкой)

Свойства: `state` default · hover · focus · error · disabled · read-only; `filled` false · true (read-only только true); `Title`, `Value` (текст); `Icon left`, `Icon right`, `Show icon left`, `Show icon right`.

Анатомия: корень 320 × `control/xl` **52**, отступы `0 space/12`, gap `space/4`, радиус `radius/m`.
`[content: gap space/8 → [icon left 24] [text: столбец, gap space/2 → Title, Value]] [icon right 24]`

| | filled=false (пусто) | filled=true |
|---|---|---|
| Title | `web/body`, на месте значения | `web/subheadline`, сверху |
| Value | скрыто | `web/body-medium`, `label/primary` |

Иконки — 24, `label/secondary`.

| state | input (серый) | input-outline | Title |
|---|---|---|---|
| default | `surface/neutral/default` | без заливки, обводка 1.5 inside `outline/control` | `label/secondary` |
| hover | `surface/neutral/hover` | обводка `outline/hover` | `label/secondary` |
| focus | как default, **без рамки** | обводка **2** `outline/brand` + `focus/ring` | `label/brand/brand`; каретка 1.5 px `label/brand/brand`, радиус full |
| error | `surface/danger-subtle` | обводка `outline/danger` | `label/danger`; значение остаётся `label/primary` |
| disabled | как default | заливка `surface/neutral/default`, обводка `outline/disabled` | `label/disabled`; значение `label/secondary`; иконки `label/disabled` |
| read-only | **как default** (не отличается) | заливка `surface/neutral/default`, обводка `outline/control` | `label/secondary` |

Select — тот же input: `Icon right` = chevron-down (открыт — chevron-up, state=focus), левую иконку скрыть, список — select-menu.

## Поля с подписью (field + caption) — в формах берём их
Добавлены 2026-11-17 по просьбе владельца DS: в формах — они, а не отдельное поле и caption-container.

| поле | серое | с обводкой |
|---|---|---|
| input | input-field `1280:3371` | input-field-outline `1280:3554` |
| textarea | textarea-field `1282:4202` | textarea-field-outline `1282:4305` |
| number-input | number-field `1282:4501` | number-field-outline `1282:4699` |
| multi-select | multi-select-field `1282:4857` | multi-select-field-outline `1282:5017` |
| phone-input | phone-field `1282:5171` | phone-field-outline `1282:5327` |

Столбец, gap 0: `[field — экземпляр поля нужного варианта] [caption — caption-container на всю ширину]`. Варианты — те же `state` × `filled`, что у поля (11). Длинный текст ошибки переносится на вторую строку, поле не меняется.
Подпись следует состоянию: error → caption `state=error` (красный текст и иконка `label/danger`); disabled → `state=disabled`; остальные → `state=default` (серая подсказка `label/secondary`).
Свойства: `Show caption` (скрыть подпись); вложенные `field` (у input-field — `input`) и `caption` открыты в панели свойств — заголовок, значение, иконки и текст подписи меняются там.
Код: `.of-field` вокруг любого поля (`.of-input` с любым `data-type`, `.of-textarea`) — подпись красится сама по `aria-invalid` / `aria-disabled` и `disabled` поля.

## textarea `696:1331` и textarea-outline `696:1401`
Та же логика, что у input. Корень: столбец, отступы `space/12` со всех сторон, gap `space/2`, радиус `radius/m`, высота от 120, растёт с текстом. Title `web/subheadline` (пусто — `web/body`), Value `web/body-medium`. Уголок `resize grip` — иконка `arrows-diagonal-2` 16, `label/tertiary`, справа внизу в 4 px; у disabled и read-only его нет.
Outline по состояниям: default/filled `outline/control` 1.5 · hover `outline/hover` · focus `outline/brand` **2, без focus/ring** · error `outline/danger` · disabled заливка `surface/neutral/default` + `outline/disabled` · read-only заливка `surface/neutral/default` + `outline/control`.

## caption-container `212:1377`
Подпись под полем, отдельно не используется. Горизонтально, отступы `space/4 space/16`, gap `space/6`; иконка `info-circle` solid 16; текст `web/subheadline`.
state: default `label/secondary` · error `label/danger` · disabled `label/disabled` (иконка того же цвета).

## select-option `696:1712` · select-menu `696:1751`
- **select-option:** высота 44, отступы `0 space/12`, gap `space/8`, радиус `radius/s`; Label `web/body` `label/primary`. hover — `surface/elevated-hover`. selected (single) — Label `web/body-medium` + галочка `check` 20 `label/brand/brand` справа; disabled — `label/disabled`. type=multi — справа `checkbox` 24 вместо галочки (в коде — `<input type="checkbox" class="of-checkbox">`).
- **select-menu:** столбец, отступы `space/6`, gap `space/2`, радиус `radius/m`, заливка `surface/elevated`, обводка 1 `outline/elevated`, тень `shadow/lg`. Под полем через 4 px, ширина = ширине поля, больше 6 вариантов — прокрутка. Типы: single · multi · empty · loading (empty и loading в коде пока нет).

## search `696:1654` (серый) и search-outline `697:1573`
Свойства: `size` m · l; `shape` round · square; `state` default · hover · focus · disabled; `filled`; `Placeholder`, `Value`, `Shortcut`, `Show shortcut`.
Анатомия: `[icon search 20] [text: Placeholder | Value] [Shortcut]`, при filled — `[clear: x 20]` вместо Shortcut. Gap `space/8`.

| | m | l |
|---|---|---|
| высота | `control/m` 36 | `control/l` 44 |
| текст (Placeholder и Value) | `web/subheadline` | `web/body` |
| иконки | 20 | 20 |

shape: round — отступы `0 space/16`, `radius/full`; square — `0 space/12`, `radius/s`.
Цвета: Placeholder и Shortcut (`web/caption-1`) — `label/tertiary`; Value — `label/primary`; лупа и крестик — `label/secondary`.

| state | search | search-outline |
|---|---|---|
| default | `surface/neutral/default` | без заливки, обводка 1.5 `outline/control` |
| hover | `surface/neutral/hover` | обводка `outline/hover` |
| focus | обводка **2** `outline/brand` + `focus/ring`, лупа `label/primary`, каретка `outline/brand` | то же |
| disabled | лупа, текст, Shortcut — `label/disabled` | + заливка `surface/neutral/default`, обводка `outline/disabled` |

В отличие от input, у **серого поиска в фокусе есть рамка**. Поиск — единственное поле без заголовка.

## number-input `724:2105` · number-input-outline `724:2373`
input высотой 52 + справа кнопки − / +: два icon-button `neutral · s · round` (иконки `minus`, `plus` 20), gap `space/4`. Отступ корня справа `space/8` (слева `space/12`). У серого поля заливка кнопок `surface/default`, у outline — обычная `surface/neutral/default`. disabled — кнопки disabled; read-only — кнопок нет, отступ справа `space/12`. Значение — `web/body-medium`. Остальное — как у input.

## multi-select `734:2477` · multi-select-outline `734:2742`
input высотой от 52 (min-height), справа `chevron-down` 24 `label/secondary` (focus — `chevron-up`; read-only — без шеврона). Строка значения: текст через запятую `web/body` (не medium) `label/primary` + плашка «+3»: высота 20, отступы `0 8`, радиус 10, заливка `surface/default` (у outline — `surface/neutral/default`), текст `web/caption-1` `label/secondary`. disabled: значение `label/secondary`, «+3» и шеврон `label/disabled`. Открывает select-menu type=multi.

## phone-input `765:2417` · phone-input-outline `765:2598`
input высотой 52. Строка значения (gap 8): код страны `web/body-medium` `label/primary` + `chevron-down` 16 `label/secondary` (gap 2) → разделитель 1 × 16 `outline/default` → номер `web/body-medium`. Пусто — строки нет, виден только заголовок. disabled: код и номер `label/secondary`, шеврон `label/disabled`; read-only — без шеврона.

## pin-cell `765:2609` · pin-input `765:2632`
- **pin-cell:** 48 × 56, `radius/m`, заливка `surface/neutral/default`, цифра `mono/title-3` (22) `label/primary` по центру. state: empty · focus (каретка 2 × 24 `label/brand/brand`, без рамки) · filled · error (`surface/danger-subtle`, цифра `label/danger`) · disabled (цифра `label/disabled`).
- **pin-input:** length 4 · 6, ячейки в ряд, gap 8. Фокус сам переходит к следующей ячейке, вставленный код заполняет все.

## upload-area `717:1773`
Столбец по центру, отступы `space/24`, gap `space/12`, `radius/l`, заливка `surface/neutral/default`, пунктир 1.5 inside `outline/default` (6 / 6). Значок: круг 44 `surface/default`, `upload` 24 `label/secondary`. Текст (gap `space/2`): «Перетащите файл сюда или» `web/subheadline-medium` `label/primary` + link `brand · sm` (gap `space/4`), текст ссылки `label/brand/strong` (на сером фоне у `label/brand/brand` 4.36:1); Hint `web/caption-1` `label/tertiary`.
state: hover — **файл над зоной**: `surface/brand-subtle/default`, рамка `outline/brand`, значок `label/brand/brand`, ссылка пропадает · error — `surface/danger-subtle`, рамка `outline/danger`, значок и Hint `label/danger` · disabled — рамка `outline/disabled`, значок, текст, ссылка `label/disabled`.

## upload-item `717:1842`
Строка: отступы `space/12`, gap `space/12`, `radius/l`, заливка `surface/neutral/default`. Значок: круг 40 `surface/default`, `file-text` 20 `label/secondary`. Текст (gap `space/4`): Name `web/subheadline-medium` `label/primary`, progress `s`, Meta `web/caption-1` `label/secondary`. Действия — icon-button `ghost · s · round`.
state: uploading — полоса + `x` (отменить) · done — без полосы, `trash` (удалить) · error — `surface/danger-subtle`, значок и Meta `label/danger`, `refresh` (повторить) + `x`.

## Правила (доска «inputs rules (DS2)» `1209:106`)
- Все поля — один input: заголовок внутри, при вводе поднимается. Select, multi-select, пароль, время, телефон — тот же input с другой иконкой или частью справа.
- Какое поле: input — одна строка; textarea — несколько строк, от 120 px; select — input с шевроном + select-menu; multi-select — в строке текст и «+3»; search — поиск по списку; number-input — число с − / +; phone-input — код страны в строке значения; pin-input — код из SMS, 4 или 6 ячеек; upload-area — загрузка, список — upload-item.
- input и input-outline — одно поле в двух видах. **В одной форме — один вид**, не смешивать. Серые — на белой карточке; обведённые — на сером фоне страницы и в плотных панелях.
- Двигается только заголовок; префикс, код страны, чипы, «+3» — на строке значения. Заголовок — существительное без двоеточия. Подсказка формата — в подписи под полем.
- disabled — нельзя менять сейчас; если нельзя никогда — показываем текстом, без поля.
- Ошибка — под полем: поле с подписью (input-field, textarea-field, number-field, phone-field, multi-select-field и -outline), state=error (подпись сама красная); текст «что не так + как исправить»: «Введите номер в формате +998 XX XXX XX XX». Проверяем при уходе из поля и при отправке, не во время набора.
- Нельзя: поле без заголовка (кроме поиска); подсказка внутри поля вместо заголовка; поле на всю ширину экрана — ширина по ожидаемому значению.

## Разметка
```html
<div class="of-field">
  <label class="of-input" data-style="outline">
    <span class="of-input__text"><span class="of-input__title">Дата приёма</span>
      <input class="of-input__value" placeholder=" " aria-invalid="true" aria-describedby="hire-err"></span>
    <svg class="of-icon"><use href="#i-calendar-line-24"/></svg>
  </label>
  <div class="of-caption" data-state="error" id="hire-err"><svg class="of-icon"><use href="#i-info-circle-solid-16"/></svg><span>Введите дату в формате ДД.ММ.ГГГГ</span></div>
</div>
```
Другие поля:
```html
<label class="of-input" data-type="number"><span class="of-input__text"><span class="of-input__title">Дней отпуска</span><input class="of-input__value" inputmode="numeric" placeholder=" " value="14"></span>
  <span class="of-input__controls"><button class="of-icon-button" data-style="neutral" data-size="s" data-shape="round" aria-label="Меньше"><svg class="of-icon"><use href="#i-minus-line-20"/></svg></button><button … aria-label="Больше">…plus…</button></span></label>
<div class="of-input" role="combobox" tabindex="0" aria-haspopup="listbox" aria-expanded="false"><span class="of-input__text"><span class="of-input__title">Тип отпуска</span>
  <span class="of-input__value">Ежегодный</span></span><svg class="of-icon"><use href="#i-chevron-down-line-24"/></svg></div>
<div class="of-input" data-type="multi" role="combobox" tabindex="0" aria-expanded="false"><span class="of-input__text"><span class="of-input__title">Отделы</span>
  <span class="of-input__row"><span class="of-input__value">Дизайн, Разработка</span><span class="of-input__count">+3</span></span></span><svg class="of-icon of-input__chevron"><use href="#i-chevron-down-line-24"/></svg></div>
<label class="of-input" data-type="phone"><span class="of-input__text"><span class="of-input__title">Телефон</span><span class="of-input__row">
  <button class="of-input__country" type="button"><span class="of-input__code">+998</span><svg class="of-icon"><use href="#i-chevron-down-line-16"/></svg></button><span class="of-input__divider"></span>
  <input class="of-input__value" type="tel" placeholder=" "></span></span></label>
<label class="of-search" data-shape="square"><svg class="of-icon"><use href="#i-search-line-20"/></svg><input class="of-search__value" type="search" placeholder="Поиск по сотрудникам">
  <kbd class="of-search__shortcut">/ + SHIFT</kbd><button class="of-search__clear" type="button" aria-label="Очистить"><svg class="of-icon"><use href="#i-x-line-20"/></svg></button></label>
<div class="of-pin" role="group" aria-label="Код из SMS"><input class="of-pin__cell" inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="Цифра 1">…</div>
```
Select (один вариант) — поле-кнопка, а не `<input readonly>`: readonly включает вид «только чтение». Открыт — `aria-expanded="true"` и `chevron-up`, под полем `.of-select-menu`.
Поле-кнопка (select, multi-select): пусто — атрибут `data-empty`, disabled — `aria-disabled="true"`, read-only — `aria-readonly="true"`, ошибка — `aria-invalid="true"`. upload-area и upload-item — разметка в `components.css`.

`placeholder=" "` обязателен (по нему поле понимает, что пусто). Без `data-style` — серое поле. Ошибка — `aria-invalid="true"` на поле; disabled / read-only — атрибуты `disabled` / `readonly`.

Форма: поля столбцом через `space/16` (в DS не задано — вопрос 24), все одного вида. Поле даты в форме из серых полей — тоже серое, с `calendar` 24 справа (доска date picker называет поле даты input-outline — вопрос 22).

## Расхождения в Figma (не исправлены — решение владельца DS)
1. **Размер.** Доска правил: «m 36 — основной размер в вебе, l 44 — мобильный и окна, в одной форме один размер». У компонентов input / textarea размер один — 52 (`control/xl`), свойства size нет.
2. **Фокус серого поля.** Доска: «focus — синяя граница». Описание компонента и сам компонент: у серого поля рамки нет — синий заголовок и каретка (рамка только у outline и у серого search).
3. **read-only серого поля** ничем не отличается от заполненного default (известно с аудита 2026-11-11, решение не принято).
4. **textarea-outline в фокусе** без свечения `focus/ring`, у input-outline оно есть.
5. Каретка у input привязана к `label/brand/brand`, у textarea и search — к `outline/brand` (одинаковый цвет, разные токены); толщина каретки 1.5 у input, 2 у number, phone, pin. В коде каретка браузерная.
6. **Лишняя тень в фокусе outline-полей.** У search-outline, number-, multi-select-, phone-input-outline в focus на корне непривязанный DROP_SHADOW, а свечение `focus/ring` — ещё и на отдельном слое `focus glow`. В коде — только `focus/ring`.
7. **multi-select:** в описании «значения — удаляемые чипы, поле растёт в высоту», в компоненте — текст через запятую и «+3» в одну строку. Значение `web/body`, у остальных полей `web/body-medium`. Отступ сверху/снизу 3, радиус «+3» 10, отступы «+3» 8 и gap строки 8 — числами, не токенами.
8. **phone-input:** gap корня 12 и строки 8 — числами.
9. **upload-item:** иконка `file-text` — рисунок 24, уменьшенный до 20 (в коде — родной рисунок 20).
10. **pin:** ячейка 48 × 56 и gap 8 — числами (токенов размера такой величины нет).
