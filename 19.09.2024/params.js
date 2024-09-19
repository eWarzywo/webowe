const http = require("http");
const fs = require("fs").promises;
const host = 'localhost';
const port = 8000;

const formatDate = (date) => {
    const pad = (n) => n < 10 ? '0' + n : n;
    return date.getFullYear() + '.' +
        pad(date.getMonth() + 1) + '.' +
        pad(date.getDate()) + '.' +
        pad(date.getHours()) + '.' +
        pad(date.getMinutes()) + '.' +
        pad(date.getSeconds());
};

const RequestListener = function (req, res) {
    const url = req.url;
    if(url.startsWith('/get_params')){
        const params = url.split('?')[1].split('&').reduce((acc, item)=>{
            const [key, value] = item.split('=');
            acc[key] = value;
            return acc;
        },{});
        const timestamp = formatDate(new Date());
        const fileName = `params_${timestamp}.json`;
        const data = JSON.stringify(params);
        console.log('params:', data);
        fs.writeFile(fileName, data)
            .then(()=>{
                console.log('Zapisano dane do pliku', fileName);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'ok': 'ok'}));
            })
            .catch((err)=>{
                console.log('Błąd zapisu do pliku', err);
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'error': 'error'}));
            });
    }

}
const server = http.createServer(RequestListener);
server.listen(port,host,()=>{
    console.log(`Serwer działa na http://${host}:${port}`);
});
