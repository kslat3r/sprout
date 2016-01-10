var passport = require('passport');
var nconf = require('nconf');

module.exports = function(app) {
  app.get('/api/auth/login', passport.authenticate('spotify'));
  app.get('/api/auth/callback', passport.authenticate('spotify', nconf.get('spotify').urls));
};