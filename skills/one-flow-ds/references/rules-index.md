# Где лежат правила в Figma

Файл: `tlHFo5v7I0fXFxtlAApApw`. Ссылка на узел: `https://www.figma.com/design/tlHFo5v7I0fXFxtlAApApw/design-systems-v2?node-id=<id через дефис>`.
Читать текст доски: `get_design_context` или `get_metadata` по id узла, картинку — `get_screenshot`. Если нужен только текст — скрипт из раздела «Прочитать доску правил текстом» в `figma-howto.md` (нужен доступ на редактирование). Без доступа к файлу правила каждой доски пересказаны в `components/<страница>.md`, раздел «Правила».
Если id не находится (доску пересобрали) — искать на странице фрейм с именем «<страница> rules (DS2)».

| Страница | Доска правил | Другое |
|---|---|---|
| inputs | `1209:106` | |
| buttons | `1209:176` | |
| avatars | `1209:243` | |
| tooltips | `1209:292` | |
| link & divider | `1211:106` | |
| loading | `1211:137` | |
| feedback | `1211:172` | |
| navigation | `1211:212` | |
| date picker | `1211:237` | |
| containers | `1211:271` | |
| context menu | `1211:292` | |
| list | `1211:317` | |
| chips | `1211:358` | |
| badges | `1211:385` | |
| tabs | `1211:416` | |
| section controls | `1211:444` | |
| table | `1211:473` | `Specs / table and filters` `782:4907` — подробные правила таблицы и фильтров |
| filters | `1211:520` | |
| nav-bar | `1211:550` | |
| side-bar | `1341:1666` | Specs `1341:2873`, тёмное превью `1341:1707` |
| attendance | `1211:607` | |
| modals | `1211:630` | |
| cards | `1211:673` | |
| widgets | `1211:690` | |
| post | `1211:722` (посты) | `comment rules (DS2)` `1140:4147` — ветки комментариев |
| charts | `chart rules (DS2)` `1083:1847` | |
| logo | `logo rules (DS2)` `1115:23` | |
| motion | доска `motion` `917:33` | живые кадры `.logo reveal / layers` `1125:44`, `.motion styles / enter` `1206:44`, `/ exit` `1206:85` |
| colors | доска `brand (DS2)` `1208:802` — white-label | |

На каждой странице компонентов есть также `Specs / <страница>` (анатомия и свойства) и `dark preview / …` (все варианты в тёмной теме).
