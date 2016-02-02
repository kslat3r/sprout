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
  startPosition: null,
  endPosition: null,
  isLooped: false,
  hasLoaded: false,
  eq: commonEQModel.defaultState
};

module.exports = mongoose.model('Set', setSchema);
