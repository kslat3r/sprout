var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var result = yield req.spotify.getUserPlaylists(req.user.profile.id, {
        limit: req.query.limit !== undefined ? req.query.limit : 20,
        offset: req.query.offset !== undefined ? req.query.offset : 0
      });

      res.send({
        playlists: result.body
      });
    }
    catch (e) {
      res.status(404).send({});
    }
  }),

  getById: wrap(function* (req, res) {
    try {
      var promises = [
        yield req.spotify.getPlaylist(req.user.profile.id, req.params.id),
        yield req.spotify.getPlaylistTracks(req.user.profile.id, req.params.id, {
          limit: req.query.limit !== undefined ? req.query.limit : 100,
          offset: req.query.offset !== undefined ? req.query.offset : 0
        })
      ];

      var results = yield promises;

      results[0].body.tracks = results[1].body;
      results[0].body.tracks.items = results[0].body.tracks.items.map(function(item) {
        return item.track;
      });

      res.send(results[0].body);
    }
    catch (e) {
      res.status(404).send({});
    }
  })
};
