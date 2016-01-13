var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var result = yield req.spotify.getMySavedAlbums({});

      res.send(result.body.items);
    }
    catch (e) {
      console.log(e);
      res.status(404).send({});
    }
  }),

  getById: wrap(function* (req, res) {
    try {
      var promises = [
        req.spotify.getAlbum.bind(req.spotify, req.params.id, {})
      ];

      var results = yield promises;
      var album = results[0].body;

      res.send(album);
    }
    catch (e) {
      res.status(404).send({});
    }
  })
};