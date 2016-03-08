var controller = require('../controllers/tracks');

module.exports = function(app) {
  app.get('/api/tracks', controller.index.bind(controller));
  app.get('/api/tracks/:id.mp3', controller.play.bind(controller));
};
