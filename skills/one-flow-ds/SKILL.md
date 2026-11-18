---
name: one-flow-ds
description: >
  This skill should be used for ANY design, UI or front-end task in the One Flow product
  (HR portal / цифровой офис Telecom Soft): when the user asks to "нарисовать экран",
  "собрать макет", "сделать по дизайн-системе", "какой компонент взять", "какой цвет / отступ / шрифт",
  "проверить макет", "передать в разработку", "сверстать по DS", mentions DS v2, One Flow design system,
  tokens, white-label / бренд клиента, or works in Figma files of One Flow. It holds the rules of
  DS v2 and tells where to read the live library in Figma.
metadata:
  version: "0.3.0"
---

# Дизайн-система One Flow (DS v2)

Отвечать на языке пользователя (обычно русский). Тексты интерфейса в макетах — на языке продукта, который назвал пользователь; в библиотеке примеры английские, русские строки — в правилах.

## Источники правды

| Что | Где |
|---|---|
| Библиотека компонентов, токены, стили | Figma-файл `tlHFo5v7I0fXFxtlAApApw` («design systems v2»), опубликованная библиотека **design systems v2**, libraryKey `lk-9219e9b39fe750262fb0169341292b23214ac79453c3edc32de917a5b6974ef84ad61d4460bb23fb1496ea1238857c0960d7fc1fc0e45b0cbbfc5a8f00d36c57` |
| Иконки | библиотека **Icons OneFlow** (`2hQBxCgrpDogWTTJJ4oP5C`), libraryKey `lk-f727b28a48b52332d81194736ef552c524480c6424f0f0a032e9077a22845de8050451ab4f4ac565b854d5f50a6df1d50556212ba6676ce15321179f5ffd8b32` |
| Правила использования | доски «<страница> rules (DS2)» на каждой странице файла — список узлов в `references/rules-index.md` |
| Брендбук One Flow v1.1 | https://claude.ai/artifact/EQgwhfg5nTJVmmbRC3s1Fo |

Старая библиотека **«Design system»** (Flowbite) устарела: её компоненты и переменные не использовать, только переносить с неё на DS v2.

Figma — источник правды о том, ЧТО есть. Этот навык — о том, КАК и ПОЧЕМУ. Перед работой с компонентом прочитать его описание (`search_design_system`) и доску правил его страницы. Если файл недоступен (нет доступа) — опираться на спецификации `references/components/*.md` (там же правила досок), `references/patterns.md`, `references/decisions.md` и кит `assets/`, и сказать пользователю, что правила взяты из навыка, а не из живого файла. Для экрана в коде Figma не нужна — `references/code-screen.md`.

## Главные правила (нарушать нельзя)

1. **Только библиотека.** Экран собирается из экземпляров компонентов DS v2. Не отвязывать (detach), не перерисовывать похожее вручную. Нет нужного компонента — сказать об этом и предложить: собрать из существующих частей или запросить у владельца DS. Новый компонент в библиотеку добавляет только владелец DS.
2. **Только токены.** Цвета — переменные коллекции `colors` (роли: `surface/*`, `label/*`, `outline/*`, `chart/*`). Никаких HEX, никаких переменных `palette` напрямую в макетах. Отступы — `space/*`, радиусы — `radius/*`, размеры контролов — `size/*`.
3. **Только текстовые стили.** Каждый текст — стиль `web/*` (веб), `web-m/*` (мобильный веб), `app/*` (приложение), `mono/*` (цифры, время, ID). Шрифты — Onest и JetBrains Mono. Абзац не меньше 16 px.
4. **Радиусы:** 4 · 8 · 12 · 16 · 24 · полный. Белые карточки — 24 на сером фоне страницы (`surface/page`).
5. **Две темы.** Всё проверять в Light и Dark (переключение режима коллекции `colors`). Есть ещё режимы повышенного контраста.
6. **Статус = иконка или точка + слово.** Цвет никогда не единственный признак.
7. **Spark (оранжевый сигнал)** — только метка «Новое / Скоро» и счётчик, до 24 px, только на светлом. Не кнопка, не заливка, не ряд графика.
8. **Графики:** ряды `chart/1–4` синими по порядку, остальное — `chart/other`; `chart/highlight` — одна точка (цель или выброс). У графика всегда период и источник.
9. **Иконки:** библиотека Icons OneFlow, `line` по умолчанию, `solid` — активное состояние. 24 / 20 / 16 px. Цвет — как у текста рядом. «Ещё действия» — горизонтальное троеточие.
10. **Движение:** длительности и кривые только из токенов `motion` и стилей анимации `Motion/*`; без отскока.
11. **Данные в макетах — выдуманные.** Неизвестные факты — заглушка `[X]` / `[Подтвердить: …]`. Бренд в тексте — «One Flow».
12. **Тексты:** сначала что случилось, потом что делать. Кнопка — глагол + объект. Без восклицательных знаков и эмодзи.

## White-label

Цвет бренда — коллекция `brand` (режим на клиента: «One Flow», «Client example»…). Роли `root/brand/*`, `surface/brand/*`, `label/brand/*`, `outline/brand`, `chart/1–3` идут через неё. Показать продукт в бренде клиента = выставить режим коллекции `brand` на фрейме. Статусы, нейтральные цвета, Spark не меняются. Подробно — доска «brand (DS2)» на странице `colors`.

## Как работать в Figma

Подробные приёмы и готовые скрипты — `references/figma-howto.md`. Коротко:
- Перед первым `use_figma` загрузить навык `figma-use` (если он есть в сессии).
- Найти компонент: `search_design_system` c `includeLibraryKeys` = ключ DS v2 (и ключ иконок для иконок). Импорт — `importComponentSetByKeyAsync` / `importComponentByKeyAsync`, переменные — `importVariableByKeyAsync`, стили — `importStyleByKeyAsync`.
- Не менять файл библиотеки `tlHFo5v7I0fXFxtlAApApw`, если пользователь не владелец DS и прямо не попросил.
- После сборки — скриншот, проверка в тёмной теме, проверка скриптом `scripts/lint.js`.

## Справочники

- `references/tokens.json` — **значения** всех токенов, снятые с Figma: роли `colors` в 4 режимах, palette, brand (One Flow и клиент), space, radius, size, typography, motion, layout, layer, 50 текстовых стилей, тени, сетки. Обновление (только владелец DS: нужны файлы Figma и Claude Code) — `scripts/export-tokens.figma.js` в `use_figma` → записать `json` в файл → `node scripts/build-tokens.mjs --hash` должен дать тот же `hash`.
- `assets/tokens.css` + `assets/typography.css` — те же токены для кода и артифактов (генерирует `node scripts/build-tokens.mjs`, руками не править). Переменная = имя в Figma, «/» → «-»: `--surface-page`, `--label-brand-brand`, `--space-16`, `--radius-xl`, `--shadow-xl`, `--duration-base`, `--easing-flow`; текст — класс `.text-web-body` или `font: var(--text-web-body); letter-spacing: var(--tracking-web-body)`. Тема: `data-theme="light|dark"` (на `<html>` или острове), контраст `data-contrast="more"`, бренд клиента `<html data-brand="client-example">`.
- `assets/preview.html` — доска всех токенов со встроенной сверкой (`node scripts/build-preview.mjs`).
- `references/components/<страница>.md` — спецификации компонентов, снятые с Figma: анатомия, размеры, токены по состояниям, правила доски, разметка, расхождения. Готово: `buttons.md`, `inputs.md` (все поля страницы inputs), `link.md` (link, divider), `loading.md`, `avatars.md`, `tooltips.md`, `feedback.md`, `navigation.md`, `date-picker.md`, `containers.md` — все атомы; молекулы: `section-controls.md`, `badges.md`, `chips.md`, `tabs.md`, `context-menu.md`, `list.md`. Организмы: `table.md`, `filters.md`, `side-bar.md`, `nav-bar.md` (шапка, меню профиля, поиск, чат поддержки, меню приложений), `charts.md` (элементы графиков, карточки, KPI), `attendance.md` (посещаемость). Шаблоны: `modals.md`, `cards.md`, `post.md`, `widgets.md`. Основы: `logo.md` (логотип, значок приложения, фавикон — правила брендбука). Все страницы DS v2 перенесены. Обновить с Figma (только владелец DS): несколько наборов сразу — `scripts/export-components.figma.js`, один — `scripts/export-component.figma.js` (вписать id набора).
- `assets/components.css` — компоненты для кода (`.of-button`, `.of-icon-button`, `.of-input` и его `data-type="number|multi|phone"`, `.of-search`, `.of-textarea`, `.of-caption`, `.of-select-menu`, `.of-select-option`, `.of-pin`, `.of-upload`, `.of-upload-item`, `.of-link`, `.of-divider`, `.of-spinner`, `.of-skeleton`, `.of-progress`, `.of-progress-circle`, `.of-avatar`, `.of-avatar-group`, `.of-tooltip`, `.of-popover`, `.of-popconfirm`, `.of-alert`, `.of-toast`, `.of-undo-toast`, `.of-empty`, `.of-page-header`, `.of-breadcrumb`, `.of-pagination`, `.of-stepper`, `.of-calendar`, `.of-picker`, `.of-drawer`, `.of-accordion`, `.of-toggle`, `.of-checkbox`, `.of-radio`, `.of-selection`, `.of-slider`, `.of-badge`, `.of-counter`, `.of-status`, `.of-chip`, `.of-tabs`, `.of-segmented`, `.of-menu`, `.of-list-item`, `.of-user`, `.of-definition`, `.of-nmark`, `.of-notification`, `.of-tree-item`, `.of-timeline`, `.of-table-card`, `.of-table`, `.of-table-bulk`, `.of-table-footer`, `.of-filter-bar`, `.of-filter-chip`, `.of-filter-panel`, `.of-filter-category`, `.of-filter-option`, `.of-shell` (каркас страницы), `.of-sidebar`, `.of-sidebar-item`, `.of-sidebar-group`, `.of-sidebar-subitem`, `.of-sidebar-flyout`, `.of-role-switch`, `.of-navbar`, `.of-profile-menu`, `.of-search-results`, `.of-chat`, `.of-chat-header`, `.of-chat-msg`, `.of-chat-input`, `.of-rate-option`, `.of-apps-menu`, `.of-app-item`, `.of-app-icon`, `.of-icon-cell`, `.of-bg-swatch`, `.of-bookmark-form`, графики: `.of-chart-marker`, `.of-delta`, `.of-chart-legend`, `.of-chart-tooltip`, `.of-chart-bar`, `.of-chart-point`, `.of-chart-line`, `.of-chart-area`, `.of-sparkline`, `.of-chart-plot`, `.of-chart-axis`, `.of-chart-rule`, `.of-chart-band`, `.of-chart-data-label`, `.of-chart-breakdown-row`, `.of-stat-mini`, `.of-stat-tile`, `.of-chart-card`, `.of-chart-ring`, `.of-chart-gauge`, `.of-chart-donut`, `.of-chart-meter`, `.of-chart-bar-row`, `.of-chart-rank-row`, `.of-chart-segbar`, `.of-chart-heat`, `.of-chart-scale`, `.of-chart-aside-panel`, `.of-chart-aside-tile`, посещаемость: `.of-day-type`, `.of-worktime-bar`, `.of-worktime-scale`, `.of-attendance-day`, `.of-entry`, `.of-attendance-entries`, `.of-attendance-days`, шаблоны: `.of-modal`, `.of-dialog`, `.of-room-card`, `.of-reaction`, `.of-reaction-summary`, `.of-reaction-picker`, `.of-reaction-button`, `.of-post-media`, `.of-poll`, `.of-poll-option`, `.of-post`, `.of-comment`, `.of-comment-thread`, `.of-comment-toggle`, `.of-comment-input`, `.of-comments-empty`, `.of-post-opened`, `.of-widget` (+ attendance, weather, food, mood, birthdays), `.of-app-tile`, `.of-apps-card`, `.of-banner`); свойства Figma = атрибуты `data-style`, `data-size`, `data-shape`, `data-state`. `assets/components-preview.html` — образцы и сверка с Figma (`node scripts/build-components-preview.mjs`; смотреть через локальный сервер — файл больше 500 КБ).
- `assets/icons.svg` — спрайт иконок Icons OneFlow (`<use href="#i-plus-line-20"/>`), источник `assets/icons.json`; источник — библиотека Icons OneFlow (`2hQBxCgrpDogWTTJJ4oP5C`): 200 иконок: 195 совпадают с ней по хэшу, 5 собраны из геометрии вектора (у `dots` выгрузка теряет точку); у всех пунктов бокового меню есть line и solid 24 (solid нет только у `user-group`). Новые иконки (только владелец DS) — `scripts/export-icons.figma.js` (сам проверяет, не потерялись ли части) → `scripts/grab-figma-result.cjs` → icons.json → `node scripts/build-icons.mjs` (и `--hash`). Иконки не рисовать самим.
- **Экран в коде или артифакте** (HTML) — по `references/code-screen.md`: подключить `tokens.css` → `typography.css` → `components.css` и спрайт `icons.svg`, каркас `.of-shell`, только классы `.of-*` и `var(--…)` — ни одного своего HEX, размера шрифта или отступа вне токенов. Токены сайта-лендинга One Flow — другой набор, для продукта не брать.
- `assets/logo/` — `logo-app-icon.svg` (значок приложения, по умолчанию в шапке) и `logo-symbol.svg` (знак), сняты со страницы `logo` DS v2; не перерисовывать.
- `references/code-screen.md` — как собрать экран в коде: подключение, каркас, тема, иконки, логотип, разметка, в которой легко ошибиться, что делает приложение.
- `references/figma-fingerprint.json` — отпечаток DS v2, с которым собран плагин (хэш токенов, хэши иконок, хэш каждого компонента и доски правил). Показывает, когда кит отстал от Figma: обновление — навык `ds-sync` (владелец DS).
- `references/decisions.md` — журнал решений владельца DS: что исправлено (контраст danger и label/tertiary, ссылки, disabled-кнопки) и что ждёт ответа. Читать перед тем, как отмечать расхождение как новое.
- `references/foundations.md` — все токены, стили, шкалы, сетка, слои, движение.
- `references/components.md` — каталог компонентов по страницам с вариантами.
- `references/patterns.md` — принятые решения по сложным местам: формы, таблица и фильтры, окна, навигация, лента и комментарии, виджеты главной, графики, логотип.
- `references/writing.md` — тексты интерфейса.
- `references/rules-index.md` — где в Figma лежат доски правил, Specs и тёмные превью.
- `references/figma-howto.md` — как читать и собирать через коннектор Figma.
- `scripts/lint.js` — проверка фрейма на соответствие DS (запускается через `use_figma`).

## Чего ещё нет в системе

Мобильной версии (iOS / Android) — она будет после веба. Если просят мобильный экран — использовать стили `app/*` и `web-m/*` и компоненты веба размера l (44), и предупредить, что мобильные компоненты ещё не утверждены.
