const express = require('express');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const routes = require('./routes');

const app = express();
const port = 3000;

configExpress(app);

configHandlebars(app);

app.use(routes);

app.listen(port, () => console.log(`The app is running on port ${port}...`))