# avatars — avatar · avatar-group

Снято с Figma `tlHFo5v7I0fXFxtlAApApw`, страница `avatars`, 2026-11-17. Код: `.of-avatar`, `.of-avatar-group` в `assets/components.css`.

## avatar `186:758` (18 вариантов)
Свойства: `size` 24 · 28 · 36 · 44 · 56 · 72; `type` photo · initials · placeholder; `Initials` (1–2 буквы); `Show status`.
Круг `radius/full`. photo — фото по кругу (cover). initials — `surface/brand-subtle/default`, буквы `label/brand/on-subtle` по центру. placeholder — `surface/neutral-strong/default`, иконка `user` solid `label/secondary`.

| size | initials | иконка placeholder | точка статуса |
|---|---|---|---|
| 24 | `web/caption-2` | user 16 | 8 |
| 28 | `web/caption-1` | user 16 | 8 |
| 36 | `web/subheadline-medium` | user 20 | 10 |
| 44 | `web/body-medium` | user 24 | 12 |
| 56 | `web/headline` | user 24 → 28 | 14 |
| 72 | `web/title-3` | user 24 → 32 | 16 |

Статус: круг `surface/success` в правом нижнем углу (вровень с краем аватара), кольцо 2 px `surface/default` снаружи.

## avatar-group `670:119`
Свойства: `size` 24 · 28 · 36; `Count`, `Show counter`, `Show 3rd`, `Show 4th`.
Каждый аватар в белом кольце 2 px (`surface/default`), кольца перекрываются: 24 → −8, 28 → −10, 36 → −12 (шаг между центрами 20 / 22 / 28). Первый аватар сверху. Счётчик «+N» — круг размера аватара `surface/neutral-strong/default`, текст `label/secondary`: 24 — `web/caption-2`, 28 — `web/caption-1`, 36 — `web/subheadline-medium`.

## Правила (доска «avatars rules (DS2)» `1209:243`)
- photo — есть фото; initials — фото нет, две буквы: имя и фамилия; placeholder — человек неизвестен или удалён.
- Размер: 24 — в тексте, чипах, упоминаниях; 28 — ответы в комментариях; 36 — строки списков и таблиц, комментарии; 44 — уведомления, карточки людей; 56–72 — профиль, виджеты.
- avatar-group — показываем до 4, остальные «+N»; по «+N» открывается полный список.
- Точка статуса — только где статус важен (чат, поддержка) и всегда объясняется словом рядом или в подсказке.
- Нельзя: растягивать фото и менять форму круга; использовать аватар как кнопку без подсказки.

## Разметка
```html
<span class="of-avatar" data-size="36"><img src="…" alt="Анна Ким"></span>
<span class="of-avatar" data-size="36" data-type="initials" role="img" aria-label="Анна Ким">АК<span class="of-avatar__status" title="В сети"></span></span>
<span class="of-avatar" data-size="36" data-type="placeholder" role="img" aria-label="Сотрудник не выбран"><svg class="of-icon"><use href="#i-user-solid-20"/></svg></span>
<div class="of-avatar-group" data-size="28"><span class="of-avatar" data-size="28" …>…</span>…<span class="of-avatar-group__count">+3</span></div>
```
Без `data-size` — 24. Иконку placeholder брать рисунком: 16 для 24–28, 20 для 36, 24 для 44–72.

## Расхождения в Figma
1. **Где какой размер.** Описание компонента: «24 — строки таблиц и списков, 28 — комментарии, 36 — шапка и карточки, 44 — виджеты». Доска правил: «24 — в тексте и чипах, 28 — ответы в комментариях, 36 — строки списков и таблиц, 44 — уведомления, карточки людей». Нужен один ответ.
2. **Наложение в группе.** Доска: «−12 px» для всех; компонент: −8 / −10 / −12 по размерам. В коде — как в компоненте.
3. placeholder 56 и 72 — иконка 24, увеличенная до 28 и 32 (таких размеров иконок в DS нет).
4. Перекрытие и кольцо группы — числами, не токенами.
