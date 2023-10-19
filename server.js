const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = 3039;

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use('/api', router);

// Форма оставить заявку
router.post('/form/callback', (req, res) => {
  res.send({
    isSuccess: true
  })
});

// Данные для карточек параметрического подборщика
router.post('/elector/flat', (req, res) => {
  res.send({
    "total": 30,
    "items": [
      {
        "src": "/assets/img/elector/scheme-1.jpg",
        "url": "/",
        "square": "127,1",
        "partHouse": "Nuovo",
        "floor": "2",
        "title": "квартира №2.12",
        "rooms": "2",
        "price": "284152000",
        "priceMeter": "190000",
        "level": "1",
        "feature": [
          {
            "icon": "/assets/img/elector/river.svg",
            "description": "Вид на реку"
          }
        ]
      },
      {
        "src": "/assets/img/elector/scheme-2.jpg",
        "url": "/",
        "square": "408,8",
        "partHouse": "Nuovo",
        "floor": "6",
        "title": "квартира №2.12",
        "rooms": "1",
        "price": "284152000",
        "priceMeter": "190000",
        "level": "2",
        "feature": [
          {
            "icon": "/assets/img/elector/river.svg",
            "description": "Вид на реку"
          },
          {
            "icon": "/assets/img/elector/pool.svg",
            "description": "С бассейном"
          }
        ]
      },
      {
        "src": "/assets/img/elector/scheme-3.jpg",
        "url": "/",
        "square": "354,1",
        "partHouse": "Nuovo",
        "floor": "6",
        "title": "квартира №2.12",
        "rooms": "5",
        "price": "421550000",
        "priceMeter": "190000",
        "level": "2"
      },
      {
        "square": "354,1",
        "url": "/",
        "partHouse": "Nuovo",
        "floor": "6",
        "title": "квартира №2.12",
        "rooms": "5",
        "level": "3",
        "feature": [
          {
            "icon": "/assets/img/elector/river.svg",
            "description": "Вид на реку"
          }
        ]
      },
      {
        "src": "/assets/img/elector/scheme-2.jpg",
        "url": "/",
        "square": "408,8",
        "partHouse": "Nuovo",
        "floor": "6",
        "title": "квартира №2.12",
        "rooms": "1",
        "price": "284152000",
        "priceMeter": "190000",
        "level": "2",
        "feature": [
          {
            "icon": "/assets/img/elector/house.svg",
            "description": "Вид на реку"
          },
          {
            "icon": "/assets/img/elector/pool.svg",
            "description": "С бассейном"
          },
          {
            "icon": "/assets/img/elector/river.svg",
            "description": "Вид на реку"
          }
        ]
      },
      {
        "square": "354,1",
        "url": "/",
        "partHouse": "Nuovo",
        "floor": "6",
        "title": "квартира №2.12",
        "rooms": "5",
        "level": "1"
      },
      {
        "src": "/assets/img/elector/scheme-3.jpg",
        "url": "/",
        "square": "354,1",
        "partHouse": "Nuovo",
        "floor": "6",
        "title": "квартира №2.12",
        "rooms": "5",
        "price": "421550000",
        "priceMeter": "190000",
        "level": "2"
      },
    ]
  });
});

// данные для сладов в слайдере попапа ход строительства
router.get('/construction/july/2023', (req, res) => {
  res.send({
    "items": [
      {
        "src": "/assets/img/construction/slide-1.jpg",
        "alt": "slide"
      },
      {
        "src": "/assets/img/construction/construction-2.jpg",
        "alt": "slide"
      },
      {
        "src": "/assets/img/construction/construction-3.jpg",
        "alt": "slide"
      }
    ]
  });
});

// Получение карточек в списке новостей
router.post('/newsList', (req, res) => {
  res.send({
    "total": 6,
    "news": [
      {
        "heading": {
          "year": "2023",
          "month": "Июль"
        },
        "items": [
          {
            "title": "машино-места и кладовые во второй очереди в рассрочку на комфортных условиях",
            "date": "23 июля",
            "url": "/"
          },
          {
            "image": {
              "src": "/assets/img/news-list/2.png",
              "alt": "preview"
            },
            "title": "ипотека с комфортом: квартиру от v2group можно приобрести по ставке 0,01%",
            "date": "16 июля",
            "url": "/"
          }
        ]
      },
      {
        "heading": {
          "year": "2023",
          "month": "Июнь"
        },
        "items": [
          {
            "image": {
              "src": "/assets/img/news-list/3.png",
              "alt": "preview"
            },
            "title": "«Правильная ипотека»: квартиры в доме duo по ставке 0,99% на время строительства дома",
            "date": "28 июня",
            "url": "/"
          },
          {
            "image": {
              "src": "/assets/img/news-list/4.png",
              "alt": "preview"
            },
            "title": "Стоимость – ниже, дом мечты – ближе: только в ИЮНЕ специальные цены на квартиры в DUO. Стоимость – ниже, дом мечты – ближе: только в ИЮНЕ специальные цены на квартиры в DUO. Стоимость – ниже, дом мечты – ближе: только в ИЮНЕ специальные цены на квартиры в DUO",
            "date": "9 июня",
            "url": "/"
          }
        ]
      }
    ]
  });
});
