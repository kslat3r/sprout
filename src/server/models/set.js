var _ = require('lodash');
var mongoose = require('mongoose');
var commonEQModel = require('../../common/models/eq');
var commonCompressorModel = require('../../common/models/compressor');
var commonDelayModel = require('../../common/models/delay');
var commonSequencerModel = require('../../common/models/sequencer');

var setSchema = mongoose.Schema({
  name: String,
  tracks: Array,
  spotifyProfileId: String,
  meta: Object,
  sequencer: Object
});

setSchema.statics.defaultMeta = {
  name: 'Untitled',
  hasLoaded: false,

  startPosition: null,
  endPosition: null,
  isLooped: false,

  volume: 100,
  pan: 0,

  eq: commonEQModel.defaultState,
  compressor: commonCompressorModel.defaultState,
  delay: commonDelayModel.defaultState
};

setSchema.statics.defaultSequencer = commonSequencerModel.defaultState;

module.exports = mongoose.model('Set', setSchema);
