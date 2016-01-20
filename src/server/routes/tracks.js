var controller = require('../controllers/tracks');

module.exports = function(app) {
  app.get('/api/tracks', controller.index.bind(controller));
};