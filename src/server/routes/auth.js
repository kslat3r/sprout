var nconf = require('nconf');
var passport = require('passport');

module.exports = function(app) {
  app.get('/api/auth/login', passport.authenticate('spotify'));
  app.get('/api/auth/callback', passport.authenticate('spotify', nconf.get('spotify').urls));
};