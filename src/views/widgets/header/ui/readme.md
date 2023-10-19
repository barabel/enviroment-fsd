### Комопнент шапки:
![screenshot](./screen.png?raw=true "Скриншот компонента шапки")
![screenshot](./screen-2.png?raw=true "Скриншот компонента шапки")

#### Пропсы:
- class: string, Дополнительные классы, модификаторы
- menu: object, Данные меню в шапки
- link: object, Данные для ссылки справа от бургера
  - url: string, Адрес ссылки
  - tilte: string, Имя ссылки
- phone: string, Номер телефона

#### отступ для шапки
при добавлении на страницу {% set bodyClass = "body--header-padding" %} появляется отступ у контента на высоту шапки
