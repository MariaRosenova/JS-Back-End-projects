const http = require('http');
const port = 3000;

const homeTemplate = require('./views/home');
const addCat = require('./views/addCat');
const addBreed = require('./views/addBreed');
const siteCss = require('./views/styles/site.js');


const server = http.createServer((req, res) => {
    if (req.url === '/') {

        res.writeHead(200, {
            'content-type' : 'text/html',
        });

        res.write(homeTemplate);
        res.end();
    } else if(req.url === '/styles/site.css') {
        res.writeHead(200, {
            'content-type':'text/css'
        });
        res.write(siteCss);
        res.end();
    } else if(req.url === '/add-cat') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write(addCat);
        res.end();
    } else if (req.url === '/add-breed') {
        res.writeHead(200, {
            'content-type':'text/html'
        });
        res.write(addBreed);
        res.end();
    }
}).listen(port);
console.log('Server is listening on port 3000...')