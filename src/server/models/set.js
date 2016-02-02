var mongoose = require('mongoose');
var commonEQModel = require('../../common/models/eq');

var setSchema = mongoose.Schema({
  name: String,
  tracks: Array,
  spotifyProfileId: String,
  tracksMeta: Object
});

setSchema.statics.defaultTrackMeta = {
  name: null,
  hasLoaded: false,

  startPosition: null,
  endPosition: null,
  isLooped: false,
  
  volume: 100,
  pan: 0,

  eq: commonEQModel.defaultState
};

module.exports = mongoose.model('Set', setSchema);
