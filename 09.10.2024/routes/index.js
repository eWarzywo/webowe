const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Strona główna');
});
router.get('/json', function(req, res, next) {
    res.json({'ok': 'ok'});
});
router.get('/html', function(req, res, next) {
    res.send('<h1>Strona HTML</h1>');
});
router.get('/file', async function(req, res, next) {
    fs.readFile('./views/index.html', 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({'error': 'File not found'});
        } else {
            res.send(data);
        }
    });
});

const formatDate = (date) => {
  const pad = (n) => n < 10 ? '0' + n : n;
  return date.getFullYear() + '.' +
      pad(date.getMonth() + 1) + '.' +
      pad(date.getDate()) + '.' +
      pad(date.getHours()) + '.' +
      pad(date.getMinutes()) + '.' +
      pad(date.getSeconds());
};
router.get('/get_params', async function(req, res, next) {
    const timestamp = new Date().getTime();
    const params = req.query;
    fs.writeFile('./public/params_' + formatDate(new Date(timestamp)) + '.json', JSON.stringify(params), (err) => {
      if (err) {
        res.status(500).json({'error': 'Error writing file'});
      } else {
        res.json({'ok': 'ok'});
      }
    });
});
router.use(express.static('assets'));
router.use(function(req, res, next) {
    res.status(404).json({'error': 'File not found'});
});
module.exports = router;
