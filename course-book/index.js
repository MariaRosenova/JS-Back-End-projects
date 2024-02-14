const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());

app.use(authMiddleware);


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

mongoose.connection.on('error', (err) => console.log(err));