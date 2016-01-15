var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var result = yield req.spotify.getFollowedArtists({});

      res.send(result.body);
    }
    catch (e) {
      res.status(404).send({});
    }
  }),

  getById: wrap(function* (req, res) {
    try {
      var promises = [
        req.spotify.getArtist.bind(req.spotify, req.params.id),
        req.spotify.getArtistTopTracks.bind(req.spotify, req.params.id, req.user.profile.country || 'GB'),
        req.spotify.getArtistAlbums.bind(req.spotify, req.params.id, {market: req.user.profile.country || 'GB'})
      ];

      var results = yield promises;
      var artist = results[0].body;

      artist.tracks = {
        items: results[1].body.tracks
      };
      artist.albums = results[2].body;

      res.send(artist);
    }
    catch (e) {
      res.status(404).send({});
    }
  })
};