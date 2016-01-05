var controller = require('../controllers/artists');

module.exports = function(app) {
  app.get('/api/artists/:id', controller.getById.bind(controller));
  app.get('/api/artists', controller.getAll.bind(controller));
};