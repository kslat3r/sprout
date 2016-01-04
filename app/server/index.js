var _ = require('lodash');
var path = require('path');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

app.use(require('marty-express')({
  marty: require('marty'),
  routes: require('../router/routes')
}));

app.get('/api/artists', require('./routes/getArtists'));
app.get('/api/artists/:id', require('./routes/getArtist'));

module.exports = app;