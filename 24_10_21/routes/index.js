var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Strona główna'});
});

router.get('/o-nas', async function (req, res, next) {
    var fs = require('fs/promises');
    var images = await fs.readdir('static');
    images = images.filter(function (image) {
        return image.startsWith('ematilore');
    });
    // log type of images element
    console.log(typeof images[0]);
    res.render('about', {title: 'O nas', images: images});
});

router.get('/kontakt', function (req, res, next) {
    res.render('contact', {title: 'Kontakt'});
});

router.get('/oferta', function (req, res, next) {
    res.render('services', {title: 'Oferta'});
});

router.post('/action', function (req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
