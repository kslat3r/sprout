import { readdirSync } from 'fs';
import { defaultState } from '../../../common/models/effects.js';

export const initialState = {
  single: ['chorus', 'delay', 'phaser', 'overdrive', 'compressor', 'convolver', 'tremolo', 'wahWah', 'bitcrusher', 'pingPongDelay'],
  multiple: ['filters'],

  default: defaultState,

  uiType: {
    chorus: {
      rate: 'range',
      feedback: 'range',
      delay: 'range'
    },
    delay: {
      feedback: 'range',
      delayTime: 'range',
      wetLevel: 'range',
      dryLevel: 'range',
      cutoff: 'range'
    },
    phaser: {
      rate: 'range',
      depth: 'range',
      feedback: 'range',
      stereoPhase: 'range',
      baseModulationFrequency: 'range'
    },
    overdrive: {
      outputGain: 'range',
      drive: 'range',
      curveAmount: 'range',
      algorithmIndex: 'select'
    },
    compressor: {
      threshold: 'range',
      makeupGain: 'range',
      attack: 'range',
      release: 'range',
      ratio: 'range',
      knee: 'range',
      automakeup: 'toggle'
    },
    convolver: {
      highCut: 'range',
      lowCut: 'range',
      dryLevel: 'range',
      wetLevel: 'range',
      level: 'range',
      impulse: 'select'
    },
    filter: {
      frequency: 'range',
      Q: 'range',
      gain: 'range',
      filterType: 'select'
    },
    tremolo: {
      intensity: 'range',
      rate: 'range',
      stereoPhase: 'range'
    },
    wahWah: {
      automode: 'toggle',
      baseFrequency: 'range',
      excursionOctaves: 'range',
      sweep: 'range',
      resonance: 'range',
      sensitivity: 'range'
    },
    bitcrusher: {
      bits: 'range',
      normfreq: 'range',
      bufferSize: 'range'
    },
    pingPongDelay: {
      wetLevel: 'range',
      feedback: 'range',
      delayTimeLeft: 'range',
      delayTimeRight: 'range'
    }
  },

  min: {
    chorus: {
      rate: 0.01,
      feedback: 0,
      delay: 0
    },
    delay: {
      feedback: 0,
      delayTime: 0,
      wetLevel: 0,
      dryLevel: 0,
      cutoff: 20
    },
    phaser: {
      rate: 0.01,
      depth: 0,
      feedback: 0,
      stereoPhase: 0,
      baseModulationFrequency: 500
    },
    overdrive: {
      outputGain: 0,
      drive: 0,
      curveAmount: 0,
      algorithmIndex: 0
    },
    compressor: {
      threshold: -100,
      makeupGain: 0,
      attack: 0,
      release: 0,
      ratio: 1,
      knee: 0
    },
    convolver: {
      highCut: 20,
      lowCut: 20,
      dryLevel: 0,
      wetLevel: 0,
      level: 0
    },
    filter: {
      frequency: 20,
      Q: 0.001,
      gain: -40
    },
    tremolo: {
      intensity: 0,
      rate: 0.001,
      stereoPhase: 0,
    },
    wahWah: {
      baseFrequency: 0,
      excursionOctaves: 1,
      sweep: 0,
      resonance: 1,
      sensitivity: -1
    },
    bitcrusher: {
      bits: 1,
      normfreq: 0,
      bufferSize: 256
    },
    pingPongDelay: {
      wetLevel: 0,
      feedback: 0,
      delayTimeLeft: 1,
      delayTimeRight: 1
    }
  },

  max: {
    chorus: {
      rate: 10,
      feedback: 1,
      delay: 1
    },
    delay: {
      feedback: 1,
      delayTime: 10000,
      wetLevel: 1,
      dryLevel: 1,
      cutoff: 22050
    },
    phaser: {
      rate: 8,
      depth: 1,
      feedback: 1,
      stereoPhase: 180,
      baseModulationFrequency: 1500
    },
    overdrive: {
      outputGain: 1,
      drive: 1,
      curveAmount: 1,
      algorithmIndex: 5
    },
    compressor: {
      threshold: 0,
      makeupGain: 100,
      attack: 1000,
      release: 1000,
      ratio: 20,
      knee: 40
    },
    convolver: {
      highCut: 22050,
      lowCut: 22050,
      dryLevel: 1,
      wetLevel: 1,
      level: 1
    },
    filter: {
      frequency: 22050,
      Q: 100,
      gain: 40
    },
    tremolo: {
      intensity: 1,
      rate: 8,
      stereoPhase: 180
    },
    wahWah: {
      baseFrequency: 1,
      excursionOctaves: 6,
      sweep: 1,
      resonance: 100,
      sensitivity: 1
    },
    bitcrusher: {
      bits: 16,
      normfreq: 1,
      bufferSize: 16384
    },
    pingPongDelay: {
      wetLevel: 1,
      feedback: 1,
      delayTimeLeft: 10000,
      delayTimeRight: 10000
    }
  },

  step: {
    chorus: {
      rate: 0.01,
      feedback: 0.01,
      delay: 0.01
    },
    delay: {
      feedback: 0.01,
      delayTime: 1,
      wetLevel: 0.01,
      dryLevel: 0.01,
      cutoff: 1
    },
    phaser: {
      rate: 0.01,
      depth: 0.01,
      feedback: 0.01,
      stereoPhase: 1,
      baseModulationFrequency: 1
    },
    overdrive: {
      outputGain: 0.01,
      drive: 0.01,
      curveAmount: 0.01,
      algorithmIndex: 1
    },
    compressor: {
      threshold: 1,
      makeupGain: 1,
      attack: 1,
      release: 1,
      ratio: 1,
      knee: 1
    },
    convolver: {
      highCut: 1,
      lowCut: 1,
      dryLevel: 0.01,
      wetLevel: 0.01,
      level: 0.01
    },
    filter: {
      frequency: 1,
      Q: 0.01,
      gain: 1
    },
    tremolo: {
      intensity: 0.01,
      rate: 0.001,
      stereoPhase: 1
    },
    wahWah: {
      baseFrequency: 0.01,
      excursionOctaves: 1,
      sweep: 0.01,
      resonance: 1,
      sensitivity: 0.01
    },
    bitcrusher: {
      bits: 1,
      normfreq: 0.1,
      bufferSize: 256
    },
    pingPongDelay: {
      wetLevel: 0.01,
      feedback: 0.01,
      delayTimeLeft: 10,
      delayTimeRight: 10
    }
  },

  selectValues: {
    overdrive: {
      algorithmIndex: [0, 1, 2, 3, 4, 5]
    },
    filter: {
      filterType: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass']
    },
    convolver: {
      impulse: [
        'Block Inside.wav',
        'Bottle Hall.wav',
        'Cement Blocks 1.wav',
        'Cement Blocks 2.wav',
        'Chateau de Logne, Outside.wav',
        'Conic Long Echo Hall.wav',
        'Deep Space.wav',
        'Derlon Sanctuary.wav',
        'Direct Cabinet N1.wav',
        'Direct Cabinet N2.wav',
        'Direct Cabinet N3.wav',
        'Direct Cabinet N4.wav',
        'Five Columns Long.wav',
        'Five Columns.wav',
        'French 18th Century Salon.wav',
        'Going Home.wav',
        'Greek 7 Echo Hall.wav',
        'Highly Damped Large Room.wav',
        'In The Silo Revised.wav',
        'In The Silo.wav',
        'Large Bottle Hall.wav',
        'Large Long Echo Hall.wav',
        'Large Wide Echo Hall.wav',
        'Masonic Lodge.wav',
        'Musikvereinsaal.wav',
        'Narrow Bumpy Space.wav',
        'Nice Drum Room.wav',
        'On a Star.wav',
        'Parking Garage.wav',
        'Rays.wav',
        'Right Glass Triangle.wav',
        'Ruby Room.wav',
        'Scala Milan Opera Hall.wav',
        'Small Drum Room.wav',
        'Small Prehistoric Cave.wav',
        'St Nicolaes Church.wav',
        'Trig Room.wav',
        'Vocal Duo.wav'
      ]
    }
  }
};

export default function() {
  return initialState;
};
