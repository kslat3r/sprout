var passport = require('passport');
var controller = require('../controllers/search');

module.exports = function(app) {
  app.get('/api/search', controller.index.bind(controller));
};