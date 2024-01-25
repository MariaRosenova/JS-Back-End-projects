const handlebars = require('express-handlebars');
const path = require('path');

function hbsConfig(app) {
    app.engine('handlebars', handlebars.engine());
    app.set('view engine', 'handlebars')
}

module.exports = hbsConfig;