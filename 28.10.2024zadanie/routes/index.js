var express = require('express');
const db = require("../public/javascripts/db");
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
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var message = req.body.message;

  var query = 'INSERT INTO messages (name, surname, email, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, surname, email, message], function(err, results) {
    if (err) {
      console.error('Error inserting data into MySQL:', err.stack);
      res.status(500).send('Error inserting data into database: ' + err.message);
      return;
    }
    res.redirect('/');
  });
});

router.get('/api/contact-messages', function (req, res, next) {
  var query = 'SELECT * FROM messages';
  db.query(query, function(err, results) {
    if (err) {
      console.error('Error fetching data from MySQL:', err.stack);
      res.status(500).send('Error fetching data from database: ' + err.message);
      return;
    }
    res.json(results);
  });
});

router.get('/api/contact-messages/:id', function (req, res, next) {
  var query = 'SELECT * FROM messages WHERE id = ?';
  db.query(query, [req.params.id], function(err, results) {
    if (err) {
      console.error('Error fetching data from MySQL:', err.stack);
      res.status(500).send('Error fetching data from database: ' + err.message);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Id not found');
      return;
    }
    res.send('Name: ' + results[0].name + ' ' + results[0].surname + '<br>Email: ' + results[0].email + '<br>Message: ' + results[0].message);
  });
});

module.exports = router;