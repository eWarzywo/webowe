var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Strona główna'});
});

router.get('/o-nas', async function (req, res, next) {
  var fs = require('fs/promises');
  var images = await fs.readdir('static');
  images = images.filter(function (image) {
    return image.startsWith('mapa');
  });
  res.render('about', {title: 'O nas', images: images});
});

router.get('/kontakt', function (req, res, next) {
  res.render('contact', {title: 'Kontakt'});
});

router.get('/oferta', function (req, res, next) {
  res.render('offer', {title: 'Oferta'});
});

router.post('/form', function (req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
