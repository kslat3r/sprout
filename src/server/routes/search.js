var controller = require('../controllers/search');

module.exports = function(app) {
  app.get('/api/search', controller.index.bind(controller));
  app.get('/api/search/artists', controller.artists.bind(controller));
  app.get('/api/search/albums', controller.albums.bind(controller));
  app.get('/api/search/tracks', controller.tracks.bind(controller));
};