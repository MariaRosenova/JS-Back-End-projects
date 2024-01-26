const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const routes = require('./routes');

const app = express();
const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('home', path.join(__dirname, 'views'));

app.use(routes);

app.use(express.static(path.join(__dirname,'public')));


app.listen(port, () => console.log(`The app is running on port ${port}...`))