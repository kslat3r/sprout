var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var result = yield req.spotify.getMySavedTracks({
        limit: req.query.limit !== undefined ? req.query.limit : 50,
        offset: req.query.offset !== undefined ? req.query.offset : 0
      });

      result.body.items.map(function(track, i) {
        result.body.items[i] = track.track;
      });

      res.send({
        tracks: result.body
      });
    }
    catch (e) {
      res.status(404).send({});
    }
  })
};