var mongoose = require('mongoose');
var commonEffectsModel = require('../../common/models/effects.js');

var setSchema = mongoose.Schema({
  name: String,
  tracks: Array,
  spotifyProfileId: String,
  tracksMeta: Object
});

setSchema.statics.defaultTrackMeta = {
  name: null,
  startPosition: null,
  endPosition: null,
  isLooped: false,
  hasLoaded: false,
  effects: commonEffectsModel.defaultState
};

module.exports = mongoose.model('Set', setSchema);
