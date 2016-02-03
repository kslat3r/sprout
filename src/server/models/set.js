var mongoose = require('mongoose');
var commonEQModel = require('../../common/models/eq');
var commonCompressorModel = require('../../common/models/compressor');

var setSchema = mongoose.Schema({
  name: String,
  tracks: Array,
  spotifyProfileId: String,
  tracksMeta: Object
});

setSchema.statics.defaultTrackMeta = {
  name: 'Untitled',
  hasLoaded: false,

  startPosition: null,
  endPosition: null,
  isLooped: false,

  volume: 100,
  pan: 0,

  eq: commonEQModel.defaultState,
  compressor: commonCompressorModel.defaultState
};

module.exports = mongoose.model('Set', setSchema);
