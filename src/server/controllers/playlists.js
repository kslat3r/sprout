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
      var result = yield req.spotify.getPlaylist(req.user.profile.id, req.params.id);

      res.send(result.body);
    }
    catch (e) {
      res.status(404).send({});
    }
  })
};