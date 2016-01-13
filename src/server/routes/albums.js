var controller = require('../controllers/albums');

module.exports = function(app) {
  app.get('/api/albums', controller.index.bind(controller));
  app.get('/api/albums/:id', controller.getById.bind(controller));
};