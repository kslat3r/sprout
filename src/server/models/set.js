var mongoose = require('mongoose');

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
  filters: [{
    frequency: 32,
    type: 'lowshelf',
    value: 0
  },
  {
    frequency: 64,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 125,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 250,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 500,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 1000,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 2000,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 4000,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 8000,
    type: 'peaking',
    value: 0
  },
  {
    frequency: 16000,
    type: 'highshelf',
    value: 0
  }],
  reverb: {

  },
  compressor: {
    threshold: -24,
    knee: 30,
    ratio: 12,
    attack: 0.003,
    release: 0.250
  }
};

module.exports = mongoose.model('Set', setSchema);