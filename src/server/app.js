//lib

var logger = require('morgan');
var path = require('path');
var nconf = require('nconf');

var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

//user lib

var routeBinder = require('./routes');
var models = require('./models');

//middleware lib

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var spotifyApi = require('./middleware/spotifyApi');

//connect to mongo

var connect = function() {
  var opts = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };

  mongoose.connect(nconf.get('dbUrl'), opts);
};

connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//passport

require('./lib/passport');

//express

var app = express();
app.set('port', nconf.get('PORT') || 5000);

//middleware

app.use(cors({
  origin: function(origin, callback){
    callback(null, nconf.get('clientUrls').indexOf(origin) !== -1);
  },
  credentials: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser('secretString'));

app.use(session({
  secret: nconf.get('sessionSecret'),
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(spotifyApi());

//routes

routeBinder(app);

//let's go

module.exports = app;