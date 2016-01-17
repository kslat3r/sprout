var wrap = require('co-express');
var mongoose = require('mongoose');
var Set = mongoose.model('Set');

module.exports = {
  create: wrap(function* (req, res) {
    try {
      var obj = {
        name: req.body.name,
        user: req.user.id,
        tracks: []
      };

      if (req.body.track) {
        obj.tracks.push(req.body.track.id);
      }

      Set.create(obj, function(err, NewSet) {
        if (err) {
          throw err;
        }

        res.send(NewSet);
      });
    }
    catch (e) {
      res.status(500).send({});
    }
  }),

  addTrackToSet: wrap(function* (req, res) {
    try {
      Set.findById(req.params.id, function(err, FoundSet) {
        if (FoundSet.tracks.indexOf(req.body.track.id) === -1) {
          FoundSet.tracks.push(req.body.track.id);
          FoundSet.save();
        }

        res.send(FoundSet);
      });
    }
    catch (e) {
      res.status(500).send({});
    }
  })
};