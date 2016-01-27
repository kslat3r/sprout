var _ = require('lodash');
var co = require('co');
var wrap = require('co-express');
var mongoose = require('mongoose');
var Set = mongoose.model('Set');

module.exports = {
  index: wrap(function* (req, res) {
    try {
      var FoundSets = yield Set.find({spotifyProfileId: req.user.profile.id});
      var promises = [];

      FoundSets.forEach(function(Set) {
        if (Set.tracks.length) {
          promises.push(req.spotify.getTracks(Set.tracks));
        }
      });

      var results = yield promises;

      results.forEach(function(result, i) {
        if (FoundSets[i].tracks.length) {
          FoundSets[i].tracks = result.body.tracks;
        }
      });

      res.send(FoundSets);
    }
    catch (e) {
      res.status(404).send({});
    }
  }),

  getById: wrap(function* (req, res) {
    try {
      var FoundSet = yield Set.findById(req.params.id);

      if (FoundSet.tracks.length) {
        var tracks = yield req.spotify.getTracks(FoundSet.tracks);
        FoundSet.tracks = tracks.body.tracks;
      }
      else {
        FoundSet.tracks = [];
      }

      res.send(FoundSet);
    }
    catch (e) {
      res.status(404).send({});
    }
  }),

  create: wrap(function* (req, res) {
    try {
      var obj = {
        name: req.body.name,
        spotifyProfileId: req.user.profile.id,
        tracks: [],
        tracksMeta: {}
      };

      if (req.body.track) {
        obj.tracks.push(req.body.track.id);
        obj.tracksMeta[req.body.track.id] = Set.defaultTrackMeta;
      }

      var NewSet = yield Set.create(obj);

      res.send(NewSet);
    }
    catch (e) {
      res.status(500).send({});
    }
  }),

  addTrackToSet: wrap(function* (req, res) {
    try {
      var FoundSet = yield Set.findById(req.params.id);

      if (FoundSet.tracks.indexOf(req.body.track.id) === -1) {
        FoundSet.tracks.push(req.body.track.id);
        FoundSet.tracksMeta[req.body.track.id] = Set.defaultTrackMeta;

        yield Set.update({_id: FoundSet.id}, FoundSet.toJSON());
      }

      res.send(FoundSet);
    }
    catch (e) {
      res.status(500).send({});
    }
  }),

  updateTrackInSet: wrap(function* (req, res) {
    try {
      var FoundSet = yield Set.findById(req.params.setId);

      if (FoundSet.tracksMeta[req.params.trackId]) {
        FoundSet.tracksMeta[req.params.trackId] = _.merge(FoundSet.tracksMeta[req.params.trackId], req.body);

        yield Set.update({_id: FoundSet.id}, FoundSet.toJSON());

        res.send(FoundSet);
      }
      else {
        throw new Error('Track not found in set');
      }
    }
    catch(e) {
      res.status(500).send({});
    }
  }),

  deleteTrackFromSet: wrap(function* (req, res) {
    try {
      var FoundSet = yield Set.findById(req.params.setId);

      FoundSet.tracksMeta = _.omit(FoundSet.tracksMeta, req.params.trackId);
      FoundSet.tracks = _.remove(FoundSet.tracks, (val, i) => {
        return val !== req.params.trackId;
      });

      yield FoundSet.save();

      res.send(FoundSet);
    }
    catch(e) {
      res.status(500).send({});
    }
  })
};