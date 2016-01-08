var passport = require('passport');
var controller = require('../controllers/initial');

module.exports = function(app) {
  app.get('/api/initial.js', controller.index.bind(controller));
};