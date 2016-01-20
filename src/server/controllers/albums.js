var _ = require('lodash');
var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var result = yield req.spotify.getMySavedAlbums({
        limit: req.query.limit !== undefined ? req.query.limit : 20,
        offset: req.query.offset !== undefined ? req.query.offset : 0
      });

      result.body.items.map(function(album, i) {
        result.body.items[i] = album.album;
      });

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