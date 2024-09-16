const http = require("http");
const fs = require("fs").promises;
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    switch (req.url) {
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end("Strona główna");
            break;
        case "/json":
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "To jest dowolny dokument w formacie JSON" }));
            break;
        case "/html":
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<html><body><h1>To jest dokument HTML</h1></body></html>");
            break;
        case "/file":
            fs.readFile(__dirname + "/index.html")
                .then(contents => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                });
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});