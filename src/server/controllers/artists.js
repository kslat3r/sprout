var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var params = {};

      if (req.query.cursor) {
        params.after = req.query.cursor;
      }

      var result = yield req.spotify.getFollowedArtists(params);

      result.body.artists.items = result.body.artists.items.filter(function(artist, i) {
        if (artist === null) {
          return false;
        }

        return true;
      });

      res.send(result.body);
    }
    catch (e) {
      console.log(e);
      res.status(404).send({});
    }
  }),

  getById: wrap(function* (req, res) {
    try {
      var promises = [
        req.spotify.getArtist(req.params.id),
        req.spotify.getArtistTopTracks(req.params.id, req.user.profile.country || 'GB'),
        req.spotify.getArtistAlbums(req.params.id, {
          market: req.user.profile.country || 'GB',
          limit: req.query.limit !== undefined ? req.query.limit : 20,
          offset: req.query.offset !== undefined ? req.query.offset : 0
        })
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