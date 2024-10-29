var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db.js');

router.post('/form', function(req, res, next) {
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
        res.send('Form data successfully inserted into database');
    });
});

module.exports = router;