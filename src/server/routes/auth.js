var passport = require('passport');
var controller = require('../controllers/auth');

module.exports = function(app) {
  app.get('/api/auth/login', passport.authenticate('spotify'));
  app.get('/api/auth/callback', passport.authenticate('spotify'), controller.callback.bind(controller));
};