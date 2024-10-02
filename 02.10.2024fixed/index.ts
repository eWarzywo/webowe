import * as http from 'http';
import * as fs from 'fs';
import mime from 'mime';


const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    const url : string | undefined = req.url;
    const error404 = {
        error: '404 Not Found'
    };
    switch (url)
    {
        case '/':
            res.end('Hello World!');
            break;
        default:
            let path = `./assets${url}`;
            let fileName = path.split('/').pop();
            fs.readFile(path, (err, data) => {
                if (err)
                {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(error404));
                }
                else
                {
                    res.writeHead(200, {'Content-Type': mime.getType(fileName)});
                    res.end(data);
                }
            });
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});