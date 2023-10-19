# Компонент шары ссылки в соц сетях

![screen](./screen.jpg?raw=true "screenshot")

## Пропсы:
- class?: string, дополнительные классы;
- media: object, объект данных для соц сетей;
  - name: "telegram | whatsapp | vk", имя соц-сети;
  - icon: object, объект данных для иконки соц-сети;
    - src: string, адрес иконки;
    - alt: string, альт иконки;

### Пример данных:
```json
[
  {
    "icon": {
      "src": "/assets/img/details-news/share/telegram.svg",
      "alt": "telegram"
    },
    "name": "telegram"
  },
  {
    "icon": {
      "src": "/assets/img/details-news/share/whatsapp.svg",
      "alt": "whatsapp"
    },
    "name": "whatsapp"
  },
  {
    "icon": {
      "src": "/assets/img/details-news/share/vk.svg",
      "alt": "vk"
    },
    "name": "vk"
  }
],
```
