const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');


const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended:false }));


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use(routes);

mongoose.connect(`mongodb://127.0.0.1:27017/course-book`)
    .then(() => {
        console.log('DB is connected');
        app.listen(port, () => {console.log(`The app is running on port ${port}`)});
    })
    .catch((err) => console.log('Error connecting to MongoDb: ', err));

