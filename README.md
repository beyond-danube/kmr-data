# Відкритті дані щодо [поіменних голосувань](https://kmr.gov.ua/uk/result_golosuvanya) Київради
## Про проєкт
В цьому репозиторії зібрані дані надані на сайті Київради. Файли виправлені таким чином, що одразу піддаються роботі та машинному аналіз. 
  
Також є [Swagger](https://beyond-danube.github.io/kmr-data/). Ніякого бекенду за ним немає, він просто віддає JSON, проте має формат зрозумілий всім хто працював з REST.

## Детальніше
### Навіщо робити будь-які модифікації у файлах, они ж вже відкриті?
Ніколи не буває чистого датасету. В даному випадку основних проблем неточності такі:
  
  
#### Пунктуація
В різних файлах буває різна пунктуація чи кількість проділів, приклад `Муха  В.В.`, `Муха В.В.` та `Муха В. В. `, які зустрічаються у документах потребували б додаткової логіки в машинному аналізі, інакше це були б 3 різні особи. Ми їх одразу привели до спільного вже у самих даних.

#### Невалідний JSON
Зустрічаються документи, де назви компаній в лапках без escape characters, вбо перенос рядка без відповідних carriage return символів. На спробі десереалізації таких документів однозначно буде виключення. На подив, сам факт того що такі документи є наводить на думку, що можливо у системі яка збирає ці дані не користувались білбіотеками для серіалізації, а написали свою реалізацію запису файлів, схожих на JSON. Це дуже дивно, проте таких документів більше 100, тобто є певний тренд. Такі файли виправлені вручну.

Приклади:
  
Оригінальний / Виправлений документ `220120_15.json`
```json
"GL_Text": "За включення до порядку денного питання про врегулювання земельних та майнових відносин використання земельної ділянки,
 що розташована за адресою місто Київ вулиця Симона Петлюри будинок 29  (08/231-1317/ПР)",
```
```json
"GL_Text": "За включення до порядку денного питання про врегулювання земельних та майнових відносин використання земельної ділянки, що розташована за адресою місто Київ вулиця Симона Петлюри будинок 29  (08/231-1317/ПР)",
```
Оригінальний / Виправлений документ `220223_22.json`
```json
"GL_Text": "За внесення до порядку денного питання про внесення змін до рішення Київської міської ради від 04.11.2021 № 3135/3176 "Про Регламент Київської міської ради" (Від 13.05.2022 № 08/231-642)",
```
```json
"GL_Text": "За внесення до порядку денного питання про внесення змін до рішення Київської міської ради від 04.11.2021 № 3135/3176 \"Про Регламент Київської міської ради\" (Від 13.05.2022 № 08/231-642)",
```
