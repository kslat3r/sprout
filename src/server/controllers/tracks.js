var wrap = require('co-express');
var request = require('request');
var fs = require('fs');

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
  }),

  play: wrap(function* (req, res) {
    try {
      var track = yield req.spotify.getTrack(req.params.id, {market: req.user.profile.country || 'GB'})
      var previewUrl = track.body.preview_url;

      request(previewUrl)
        .on('response', function(response) {
          response.headers = [];
        }).pipe(res);
    }
    catch (e) {
      console.log(e);
      res.status(404).send();
    }
  })
};
