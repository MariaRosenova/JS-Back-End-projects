const http = require('http');
const fs = require('fs');
const port = 3000;


const cats = [
    {
        id: 1,
        name: 'Tommy',
        imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',

    },
    {
        id: 2,
        name: 'Sivcho',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/IC_Blue_Melody_Flipper_CHA_male_EX1_CACIB.jpg/640px-IC_Blue_Melody_Flipper_CHA_male_EX1_CACIB.jpg',
        breed: 'The best cat ever',
        description: 'If you want your cat to do something, wait for their permission or be by their side.',
    }
];

const views = {
    home: './views/home.html',
    addCat: './views/editCat.html',
    css: './views/styles/site.css',
    addBreed: './views/addBreed.html',
};
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(views.home, {encoding: 'utf-8'}, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(result);
            res.end();
        })
    } else if(req.url === '/cats/add-cat') {
        fs.readFile(views.addCat, {encoding: 'utf-8'}, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(result);
            res.end();
        })
    } else if (req.url == '/styles/site.css') {
        fs.readFile(views.css, {encoding: 'utf-8'}, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            res.writeHead(200, {
                'content-type': 'text/css'
            });
            res.write(result);
            res.end();
        })
    } else if (req.url === '/cats/add-breed') {
        fs.readFile(views.addBreed, {encoding: 'utf-8'}, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(result);
            res.end();
        })
    }
}).listen(3000);

function render(view, data, callback) {
    fs.readFile(view, 'utf-8', (err, result) => {
        if (err) {
            return callback(err);
        }
        const htmlResult = Object.keys(data).reduce((acc, key) => {
            const pattern = new RegExp(`{{${key}}}`, 'g');
            return result.replace(pattern, data[key]);
        }, result)

    }, result)
   return htmlResult;
}

console.log('Server is listening on port 3000...')