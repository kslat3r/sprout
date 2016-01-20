var controller = require('../controllers/sets');

module.exports = function(app) {
  app.get('/api/sets/:id', controller.getById.bind(controller));
  app.get('/api/sets', controller.index.bind(controller));
  app.post('/api/sets/:id', controller.addTrackToSet.bind(controller));
  app.post('/api/sets', controller.create.bind(controller));
};