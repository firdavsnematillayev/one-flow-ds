# Каталог компонентов DS v2

Снят с файла 2026-11-17. Имя — так компонент называется в библиотеке; в скобках — варианты. Полное описание и свойства — через `search_design_system` (поле description) или Specs на странице. Компоненты с точкой или подчёркиванием в начале имени — примеры, в библиотеку не попадают.

## Основы
- **logo:** `logo-symbol` (version: full color|flat|ink|white|blue|solid), `logo` (layout: horizontal|stacked|stacked with tagline; version: full color|flat|ink|white|blue|full color reversed), `logo-module` (module: People|Tasks|Meet|Mail|Calendar|Learn|KPI|Chat|Docs|Hire; version: full color|full color reversed), `logo-favicon` (size: 32|24|16), `logo-app-icon` (platform: ios light|ios dark|ios tinted|android|desktop)

## Атомы
- **inputs:** `input`, `input-outline`, `textarea`, `textarea-outline`, `number-input`, `number-input-outline`, `multi-select`, `multi-select-outline`, `phone-input`, `phone-input-outline` (state: default|hover|focus|error|disabled|read-only; filled), `search`, `search-outline` (size: m|l; shape: round|square; state; filled), `select-option` (type: single|multi; selected; state), `select-menu` (type: single|multi|empty|loading), `pin-cell`, `pin-input` (length: 4|6), `upload-area` (state: default|hover|error|disabled), `upload-item` (state: uploading|done|error), `caption-container` (state: default|error|disabled)
- **buttons:** `button` (style: primary|tonal|neutral|neutral-strong|outline|danger; size: xs|s|m|l|xl; state: default|hover|pressed|focus|loading|disabled; shape: default|round), `icon-button` (style: primary|tonal|neutral|outline|ghost|danger; size: xs|s|m|l; state; shape), `button-group` (type: text|icon|split; size: s|m|l)
- **avatars:** `avatar` (size: 24|28|36|44|56|72; type: photo|placeholder|initials), `avatar-group` (size: 24|28|36)
- **tooltips:** `tooltip` (placement ×8; tone: light|dark), `popconfirm`, `popover` (arrow: none|top|bottom)
- **link & divider:** `link` (tone: brand|neutral; size: sm|md; state), `divider` (orientation: horizontal|vertical; label)
- **loading:** `spinner` (tone: brand|neutral|inverse; size: xs…xl), `skeleton` (type: text|title|block|avatar; phase: static|start|end), `progress` (size: s|m; value), `progress-circle` (size: s|m|l; value)
- **feedback:** `alert` (size: m|s; tone: info|success|warning|danger|neutral), `toast` (tone ×5), `undo-toast` (phase: start|end), `empty-state` (size: m|l)
- **navigation:** `page-header`, `breadcrumb`, `breadcrumb-item`, `pagination`, `pagination-item`, `stepper` / `step` (orientation: horizontal|stacked|vertical; state: upcoming|current|done|error)
- **date picker:** `calendar` (mode: single|range), `calendar-day`, `date-picker` (mode: single|range), `date-range-picker`, `month-picker`, `month-cell`, `time-picker` (step: 5|15), `time-cell`
- **containers:** `drawer` (size: s 400|m 560), `accordion`, `accordion-item`

## Молекулы
- **context menu:** `menu`, `menu-item` (tone: default|danger; state), `menu-control` (type: checkbox|radio|toggle), `menu-divider`
- **list:** `list-item` (size: m|s; state), `user` (size: s|m|l), `definition-item`, `definition-list` (layout: rows|grid), `notification-item` (state: unread|read), `notification-mark`, `notification-group-title`, `tree-item` (type: collapsed|expanded|leaf), `timeline-item` (state: done|current|upcoming)
- **chips:** `chip` (size: m|xs; type: label|icon-only; selected; state)
- **badges:** `badge` (appearance: subtle|solid; tone: neutral|brand|info|success|warning|danger|signal; size: s|m), `counter` (tone: danger|brand|neutral|signal; type: count|dot), `status` (tone ×6; size: m|s)
- **tabs:** `tabs`, `tab` (size: m|s; selected; state), `segmented`, `segmented-item` (size: m|l)
- **section controls:** `toggle`, `checkbox` (checked: false|true|indeterminate), `radio`, `selection`, `slider` (type: single|range)

## Организмы
- **table:** `table`, `table-header-row`, `table-header-cell` (sort; align; state), `table-row` (state: default|hover|selected; size: m 56|s 44), `table-cell` (type: text|two-line|number|user|status|badge|checkbox|actions|button), `table-index-cell`, `table-header-index`, `table-group-row`, `table-more-row`, `table-skeleton-row`, `table-toolbar`, `table-bulk-bar`, `table-footer`, `page-size-menu`, `table-resize-guide`; готовые состояния `table / grouped`, `table / loading`, `table / empty`, `table / error`
- **filters:** `filter-bar` (state: default|active|overflow), `filter-panel` (kind: list|search|date), `filter-values`, `filter-category` (pinned; state), `filter-option`, `filter-chip` (kind: applied|preset|more), `filter-group-title`
- **nav-bar:** `nav-bar`, `search-results`, `profile-menu`, `profile-submenu / language`, `profile-submenu / theme`, поддержка: `support-chat` (9 состояний), `chat-header`, `chat-message`, `chat-input`, `chat-system`, `chat-typing`, `rate-option`; приложения: `apps-menu` (state: default|edit|dragging|empty|many), `app-item`, `app-icon`, `bookmark-form`, `icon-cell`, `background-swatch`
- **side-bar:** `side-bar` (role: user|admin; mode: expanded|collapsed), `side-bar-item`, `side-bar-subitem`, `role-switch`
- **charts:** карточки `chart-card`, `chart-card-header`, `stat-tile`, `stat-mini`, `delta`; элементы `chart-plot`, `chart-bar`, `chart-bar-row`, `chart-rank-row`, `chart-line`, `chart-area`, `chart-point`, `chart-sparkline`, `chart-ring`, `chart-gauge`, `chart-donut`, `chart-meter`, `chart-segmented-bar`, `chart-heatmap-cell`, `chart-scale`, `chart-axis-label`, `chart-rule`, `chart-band`, `chart-marker`, `chart-legend`, `chart-legend-item`, `chart-tooltip`, `chart-tooltip-row`, `chart-breakdown-row`, `chart-data-label`, `chart-aside-panel`, `chart-aside-tile`, `chart-view-switch`
- **attendance:** `attendance-day`, `attendance-entries`, `entry` (direction: in|out), `work-time-bar`, `work-time-scale`, `day-type`

## Шаблоны
- **modals:** `modal` (size: s 480|m 640|l 960), `dialog` (tone: neutral|danger), `modal-slot`
- **cards:** `room-card` (layout: vertical|horizontal; state: default|hover|inactive|loading)
- **post:** `post` (type: text|photo|gallery|video|poll; state: default|loading|new), `post-opened` (type: media|text|video; comments: list|empty), `post-media`, `post-menu` (role: reader|author), `poll`, `poll-option`, `reaction`, `reaction-button`, `reaction-picker`, `reaction-summary`, `comment` (level: comment|reply; state: default|highlighted|deleted), `comment-thread`, `comment-input` (mode: comment|reply), `comment-toggle`, `comments-empty`
- **widgets:** `banner`, `apps-card`, `app-tile`, `widget-attendance`, `widget-weather`, `widget-food`, `widget-mood` (state: question|question-hover|results|waiting), `widget-birthdays`
