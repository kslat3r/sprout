//lib

var logger = require('morgan');
var path = require('path');
var nconf = require('nconf');

var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session)
var passport = require('passport');

//middleware lib

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

//user lib

var routeBinder = require('./routes');
var models = require('./models');

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', nconf.get('PORT') || 5000);

//middleware

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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

//routes

routeBinder(app);

//let's go

module.exports = app;