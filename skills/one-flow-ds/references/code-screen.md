# Экран в коде (HTML, артифакт, прототип)

Экран в коде собирается из кита `assets/`; доступ к Figma для этого не нужен. В ките:
- `tokens.css` и `typography.css` — токены;
- `components.css` — компоненты `.of-*`;
- `icons.svg` — спрайт иконок;
- `logo/` — логотип.

Разметка каждого компонента — в комментарии к его блоку в `components.css` и в `references/components/<страница>.md`.

## Каркас страницы

```html
<!doctype html>
<html lang="ru">                       <!-- тема как в системе; принудительно — data-theme="light|dark" -->
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="tokens.css">
  <link rel="stylesheet" href="typography.css">
  <link rel="stylesheet" href="components.css">
  <!-- свои стили — после, только через var(--…) -->
</head>
<body class="of-app">
  <!-- содержимое assets/icons.svg целиком, первым в <body> (сам спрайт скрыт) -->
  <div class="of-shell">
    <header class="of-navbar">…</header>
    <nav class="of-sidebar" aria-label="Разделы">…</nav>
    <main class="of-shell__main"><div class="of-shell__content">
      <header class="of-page-header">…</header>
      <section class="of-table-card">…</section>
    </div></main>
  </div>
</body></html>
```

Порядок подключения обязателен: сначала `tokens.css`, потом `typography.css`, потом `components.css`. В артифакте (один файл) все три файла и спрайт вставляются целиком: CSS — в `<style>`, спрайт — первым в `<body>`.

Как устроен каркас (`.of-shell`):
- шапка 82 и меню 284 / 72 не уезжают при прокрутке;
- контент шириной до 1104 стоит по центру;
- поля вокруг контента — 24, промежуток между блоками — 16.

## Тема, контраст, бренд

| Что | Как |
|---|---|
| Тема | по системе; принудительно — `<html data-theme="light|dark">`. Переключатель темы ставит этот атрибут. |
| Тёмный блок на светлой странице | `data-theme="dark"` на самом блоке. |
| Повышенный контраст | `data-contrast="more"` или системная настройка. |
| Бренд клиента | `<html data-brand="client-example">` — только на корне. |

Каждый экран нужно проверить в светлой и тёмной теме.

## Иконки и логотип

- **Иконка:** `<svg class="of-icon"><use href="#i-<имя>-<line|solid>-<24|20|16>"/></svg>`. Внутри компонента размер ставит сам компонент. Отдельная иконка по умолчанию 20; размер меняется через `width` / `height`: `var(--icon-s|m|l)`. Цвет берётся от текста рядом.
- **Активный пункт меню:** в пункт кладут обе иконки — line и `of-sidebar-item__solid`; CSS сам показывает solid у пункта с `aria-current`. Solid есть у всех пунктов, кроме `user-group` («Моё подразделение»): у него остаётся line (вопрос 10 в `decisions.md`).
- **Раздел с подпунктами:** `.of-sidebar-group` — кнопка раздела с `aria-expanded` + `.of-sidebar-group__items` с подпунктами; `aria-current` ставится только у подпункта, отметки раздела CSS ставит сам. В свёрнутом меню подпункты — во всплывающем `.of-sidebar-flyout` (разметка — `components/side-bar.md`).
- **Логотип в шапке:** по умолчанию `assets/logo/logo-app-icon.svg` — значок приложения One Flow, светлый вариант для iOS. Для клиента (white-label) — его собственный файл логотипа. Отдельный знак One Flow — `assets/logo/logo-symbol.svg`.
- Логотип и иконки берут только из файлов кита: не перерисовывают и не набирают шрифтом.

## Разметка, в которой легко ошибиться

**Поля и флажки**
- Флажок и радиокнопка — всегда `<input type="checkbox|radio" class="of-checkbox|of-radio">`. Без `type` это текстовое поле, и галочка не появится.
- Select (один вариант) — `<div class="of-input" role="combobox" tabindex="0" aria-haspopup="listbox" aria-expanded="false">` со значением в `<span class="of-input__value">` и `chevron-down` 24. Не `<input readonly>`: так выглядит поле только для чтения.
- Поля формы:
  - один вид на форму: на белой карточке или в окне — серые, на сером фоне — обведённые;
  - поле даты в такой форме — того же вида, с иконкой `calendar` 24;
  - между полями — `space/16` (в DS не задано, вопрос 24).

**Ссылки и кнопки**
- Ссылка ведёт на другую страницу, кнопка делает действие на месте.
- Действие с видом ссылки («Сбросить», «Показать ещё») — `<button type="button" class="of-link">`.

**Окно**
- Открыть / закрыть — атрибут `hidden` на `.of-modal-backdrop`; появление — `data-enter` у `.of-modal`.
- `hidden` прячет любой компонент `.of-*`.

**Таблица**
- Выбранная строка: `<tr aria-selected="true">` и флажок `checked`.
- Выбраны не все строки: `<thead data-selection="some">` и флажок шапки `el.indeterminate = true`. Выбраны все: `data-selection="all"`.
- Панель выбранных строк (`.of-table-bulk`) — последним ребёнком `.of-table-card`. Она держится по центру внизу таблицы.
- Главная кнопка: если действие уже есть в `page-header`, в панели таблицы primary не ставят (вопрос 23).

**Числа**
- Числа, время, ID — `mono/*`. В таблице цифры набраны так же, как в компоненте Figma (`web/body` с одинаковой шириной цифр), — вопрос 19.

## Что делает приложение, а не CSS

- Ниже 1440 px — `data-mode="collapsed"` на `.of-sidebar`. Выбор пользователя («Скрыть») запоминается.
- Пока открыто окно или шторка:
  - страница под ним не прокручивается (`overflow: hidden` на `<html>`);
  - фокус остаётся внутри;
  - окно закрывается по Esc и по клику на фон.
- `indeterminate` у флажка шапки таблицы, таймер undo-toast, открытие меню и выбор в select.

## Проверка перед сдачей

1. Светлая и тёмная тема, затем `data-contrast="more"`.
2. В своих стилях нет HEX, `rgb()`, размеров шрифта и отступов числом — только `var(--…)`.
3. Компонент выглядит как образец на доске `assets/components-preview.html`. Доску открывают через локальный сервер: `python3 -m http.server --directory assets`.
4. Нажимаемые элементы доступны с клавиатуры, кольцо фокуса видно. У кнопок-иконок есть `aria-label`.
