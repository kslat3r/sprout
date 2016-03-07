var controller = require('../controllers/sets');

module.exports = function(app) {
  app.get('/api/sets/:id', controller.getById.bind(controller));
  app.get('/api/sets', controller.index.bind(controller));
  app.post('/api/sets/:id', controller.addTrackToSet.bind(controller));
  app.post('/api/sets', controller.create.bind(controller));
  app.patch('/api/sets/:setId/tracks/:trackId/meta', controller.updateMeta.bind(controller));
  app.put('/api/sets/:setId/tracks/:trackId/sequencer', controller.updateSequencer.bind(controller));
  app.delete('/api/sets/:setId/tracks/:trackId', controller.deleteTrackFromSet.bind(controller));
};
