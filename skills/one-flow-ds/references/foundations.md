# Основы DS v2

Значения сняты с файла 2026-11-17. Если сомневаешься — прочитай переменные живьём (`get_variable_defs` или `search_design_system` по имени).

## Коллекции переменных

| Коллекция | Режимы | Что внутри |
|---|---|---|
| `colors` | Light · Dark · Light · contrast · Dark · contrast | роли цвета — **только их** ставить в макетах |
| `brand` | One Flow · Client example (+ клиенты) | шкала бренда `brand/50…950`; в макетах напрямую не используется, на неё ссылаются роли |
| `palette` | Value | сырые шкалы (blue, orange, neutral, success, warning, danger, info, signal…) — в макетах не использовать |
| `space` | — | `space/2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64` |
| `radius` | — | `radius/xs 4, s 8, m 12, l 16, xl 24, full 999` |
| `size` | — | `control/xs 24, s 32, m 36, l 44, xl 52`; `icon/s 16, m 20, l 24` |
| `typography` | — | семейства Onest / JetBrains Mono, размеры и интерлиньяжи всех стилей |
| `motion` | — | `duration/instant 100, quick 200, base 320, slow 560, brand 4000`; `easing/flow (0.22,1,0.36,1)`, `exit (0.55,0,1,0.45)`, `standard (0.4,0,0.2,1)` |
| `layout` | Desktop · Tablet · Mobile | `breakpoint/min-width 1024`, `grid/columns 12`, `gutter 16`, `margin 24`, `content/max-width 1104`, `content/rail 304`, `shell/nav-bar/height 82`, `shell/side-bar/expanded 284`, `collapsed 72` |
| `layer` | — | z-index: `base 0, raised 10, sticky 100, dropdown 200, panel 300, scrim 400, modal 500, toast 600, tooltip 700` |

## Роли цвета (`colors`)

- **Поверхности:** `surface/page` (серый фон страницы), `surface/default` (белые карточки, окна, шторки), `surface/elevated` (+ `-hover`, `-pressed`; меню, поповеры, тосты, календарь), `surface/inverse`, `surface/scrim` (затемнение под окном), `surface/disabled`.
- **Бренд:** `surface/brand/brand|hover|pressed|disabled`, `surface/brand-subtle/default|hover|pressed`, `label/brand/brand|strong|on-subtle|disabled`, `outline/brand`, `root/brand/50…950`.
- **Нейтральные контролы:** `surface/neutral/default|hover|pressed`, `surface/neutral-strong/*`, `surface/ghost/hover|pressed`, `surface/segmented/thumb`.
- **Текст:** `label/primary`, `label/secondary`, `label/tertiary`, `label/disabled`, `label/inverse`.
- **Границы:** `outline/default`, `outline/subtle`, `outline/hover`, `outline/control`, `outline/focus`, `outline/elevated`, `outline/disabled`, `outline/danger`.
- **Статусы:** `surface/{success|warning|info|danger}` + `-subtle` + `-strong`, `label/{success|warning|info|danger}`. `surface/danger/default|hover|pressed` — опасные кнопки.
- **Spark:** `surface/signal`, `surface/signal-subtle`, `label/signal`, `label/on-signal` (на тёмном сами становятся Sky).
- **Графики:** `chart/1, 2, 3, 4, other, highlight`.
- **Скелетон:** `surface/skeleton/base`, `surface/skeleton/highlight`.
- **Стекло:** `surface/glass/brand|neutral|dark`, `outline/glass` — только поверх фото и картинок, вместе с эффектом `effect/glass`.
- **Тени и фокус:** `shadow/key`, `shadow/ambient`, `shadow/focus`.

## Текстовые стили

- **web/** (веб ≥1024): `display 72/76 ExtraBold`, `large-title 48/56`, `title-1 36/44`, `title-2 28/36`, `title-3 22/28 SemiBold`, `headline 18/26 SemiBold`, `body 16/24` (+ `-medium`, `-semibold`), `callout 15/22`, `subheadline 14/20` (+ `-medium`, `-semibold`), `footnote 13/18`, `caption-1 12/16 Medium` (+ `-semibold`), `caption-2 11/14`, `overline 12/16 JetBrains Mono Medium`.
- **web-m/** (мобильный веб): те же имена, меньше размеры (title-1 28/34, body 16/24…).
- **app/** (приложения iOS/Android): `large-title 34/41` … `body 17/22` … `caption-2 11/13`.
- **mono/** (JetBrains Mono): `caption-1/2`, `subheadline`, `body` (+ `-medium`), `title-2`, `title-3` — цифры, время, ID, суммы, ключевые показатели.

## Эффекты и сетки

- Тени: `shadow/xs`, `sm`, `md`, `lg`, `xl`. Фокус: `focus/ring`. Стекло: `effect/glass` (размытие фона 20).
- Сетки: `grid/page`, `grid/content`, `grid/8 px`.

## Стили анимации (Figma Motion)

`Motion/Enter/Fade in · quick 200`, `Pop in · quick 200` (меню, поповеры), `Rise · base 320` (тосты, окна, новые посты), `Slide from right · base 320` (шторки), `Content in · slow 560` (контент вместо скелетона, смена страницы); `Motion/Exit/…` — те же движения обратно с кривой exit; `Motion/Brand/Name reveal · 750` — только заставки и видео.
Что чем двигается: наведение 100 + standard; переключатели, вкладки, реакции 200 + standard; меню, подсказки 200 + flow; окна, шторки, тосты 320 + flow; контент вместо скелетона 560 + flow; любой уход — тот же токен + exit. Скелетон переливается 1200 ms по кругу; обратный отсчёт undo-toast — 5000 ms линейно.

## Каркас страницы (веб)

Верхняя панель 82 → боковое меню 284 (от 1440 px) или 72 (меньше 1440) → контент max 1104 по центру, фон `surface/page`. Главная: лента 784 + колонка 304. Контент не растягивается шире 1104 — по бокам остаются поля.
