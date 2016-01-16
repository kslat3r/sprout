var _ = require('lodash');
var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var result = yield req.spotify.getMySavedAlbums({});

      res.send(result.body);
    }
    catch (e) {
      res.status(404).send({});
    }
  }),

  getById: wrap(function* (req, res) {
    try {
      var promises = [
        req.spotify.getAlbum.bind(req.spotify, req.params.id, {market: req.user.profile.country || 'GB'})
      ];

      var results = yield promises;
      var album = results[0].body;

      var clonedAlbum = _.clone(album);
      clonedAlbum.tracks = undefined;

      album.tracks.items.forEach(function(track) {
        track.album = clonedAlbum;
      });

      res.send(album);
    }
    catch (e) {
      res.status(404).send({});
    }
  })
};