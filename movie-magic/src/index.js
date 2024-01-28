const express = require('express');
const mongoose = require('mongoose');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const routes = require('./routes');

const app = express();
const port = 3000;

configExpress(app);

configHandlebars(app);

app.use(routes);

mongoose.connect(`mongodb://127.0.0.1:27017/magic-movies`)
.then(() => {
   console.log('DB Connected');
   app.listen(port, () => console.log(`The app is running on port ${port}...`))
   
})
    .catch((err) => console.error('Error connecting to MongoDB:', err));

    