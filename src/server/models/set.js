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
  hasLoaded: false,
  effects: {
    reverb: {
      highCut: 22050,
      lowCut: 20,
      dryLevel: 0,
      wetLevel: 0,
      level: 0,
      impulse: null,
      bypass: 1
    },
    chorus: {
      rate: 1.5,
      feedback: 0.2,
      delay: 0.0045,
      bypass: 1
    },
    delay: {
      feedback: 0.45,
      delayTime: 150,
      wetLevel: 0.25,
      dryLevel: 1,
      cutoff: 2000,
      bypass: 1
    },
    phaser: {
      rate: 1.2,
      depth: 0.3,
      feedback: 0.2,
      stereoPhase: 30,
      baseModulationFrequency: 700,
      bypass: 1
    },
    overdrive: {
      outputGain: 0.5,
      drive: 0.7,
      curveAmount: 1,
      algorithmIndex: 0,
      bypass: 1
    },
    compressor: {
      threshold: 0.5,
      makeupGain: 1,
      attack: 1,
      release: 0,
      ratio: 4,
      knee: 5,
      automakeup: true,
      bypass: 1
    },
    convolver: {
      highCut: 22050,
      lowCut: 20,
      dryLevel: 1,
      wetLevel: 1,
      level: 1,
      impulse: null,
      bypass: 1
    },
    filters: {
      bypass: 1,
      items: [
        {
          frequency: 32,
          Q: 1,
          gain: 0,
          filterType: 'lowshelf',
          bypass: 0
        },
        {
          frequency: 64,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 125,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 250,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 500,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 1000,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 2000,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 4000,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 8000,
          Q: 1,
          gain: 0,
          type: 'peaking',
          bypass: 0
        },
        {
          frequency: 16000,
          Q: 1,
          gain: 0,
          type: 'highshelf',
          bypass: 0
        }
      ]
    },
    tremolo: {
      intensity: 0.3,
      rate: 4,
      stereoPhase: 0,
      bypass: 1
    },
    wahWah: {
      automode: true,
      baseFrequency: 0.5,
      excursionOctaves: 2,
      sweep: 0.2,
      resonance: 10,
      sensitivity: 0.5,
      bypass: 1
    },
    bitcrusher: {
      bits: 4,
      normfreq: 0.1,
      bufferSize: 4096,
      bypass: 1
    },
    pingPongDelay: {
      wetLevel: 0.5,
      feedback: 0.3,
      delayTimeLeft: 150,
      delayTimeRight: 200,
      bypass: 1
    }
  }
};

module.exports = mongoose.model('Set', setSchema);
