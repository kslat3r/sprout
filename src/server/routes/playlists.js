var controller = require('../controllers/playlists');

module.exports = function(app) {
  app.get('/api/playlists', controller.index.bind(controller));
  app.get('/api/playlists/:id', controller.getById.bind(controller));
};