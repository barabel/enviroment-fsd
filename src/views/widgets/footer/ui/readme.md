### Комопнент footer:
![screenshot](./screen.jpg?raw=true "Скриншот")

#### Пропсы:
- pin: object, пин-ссылка в верхней части футера
  - url: string, адрес ссылки
  - title: string, текст ссылки
- copyright: string, копирайт
- politics: object, ссылка на политику безопасности
  - url: string, адрес ссылки
  - title: string, текст ссылки
- logos: array, логотипы
  - src: путь к картинке
  - alt: альтернативный текст к картинке
  - url: адрес ссылки
- links: array, ссылки
  - url: string, адрес ссылки
  - title: string, текст ссылки
- description: string, текстовое описание внижней части футера

```
"footer": {
  "pin": {
    "title": "Москва, Софийская набережная, 34/3",
    "url": "https://yandex.ru/maps/213/moscow/house/sofiyskaya_naberezhnaya_34s3/Z04YcAViTkQGQFtvfXt1d39lYQ==/?indoorLevel=1&ll=37.622710%2C55.746365&z=17"
  },
  "copyright": "© DUO",
  "politics": {
    "title": "Политика конфиденциальности",
    "url": "#"
  },
  "logos": [
    {
      "src": "/assets/img/footer/logo1.svg",
      "alt": "v2group",
      "url": "#"
    }
  ],
  "links": [
    {
      "title": "Документы",
      "url": "#"
    }
  ],
  "description": "Права на графические, текстовые, музыкальные и иные материалы, принадлежат их законным владельцам. Запрещено любое коммерческое копирование без письменного разрешения правообладателей."
}
```
