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
