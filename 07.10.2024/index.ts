import express from 'express';
import * as fs from 'fs';
import mime from 'mime';
const app = express();

const port = 3000;
const hostname = 'localhost';


const formatDate = (date) => {
    const pad = (n) => n < 10 ? '0' + n : n;
    return date.getFullYear() + '.' +
        pad(date.getMonth() + 1) + '.' +
        pad(date.getDate()) + '.' +
        pad(date.getHours()) + '.' +
        pad(date.getMinutes()) + '.' +
        pad(date.getSeconds());
};

app.get('/', (req, res) => {
  res.send('Strona główna');
});
app.get('/json', (req, res) => {
    res.json({ message: 'Hello world!' });
});
app.get('/html', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});
app.get('/htmlfile', async (req, res) => {

    const file = await fs.promises.readFile('./hello.html', 'utf8');
    res.send(file);
});
app.get('/get_params', (req, res) => {
    console.log(req.query);
    const timestamp = formatDate(new Date());
    const data = JSON.stringify(req.query);
    fs.promises.writeFile('params_' + timestamp + '.json', data);
    res.json({ ok: 'ok' });
});

app.use(express.static('assets'));


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
