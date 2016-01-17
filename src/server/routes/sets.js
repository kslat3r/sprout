var controller = require('../controllers/sets');

module.exports = function(app) {
  app.post('/api/sets', controller.create.bind(controller));
  app.post('/api/sets/:id', controller.addTrackToSet.bind(controller));
};