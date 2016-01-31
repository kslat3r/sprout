import * as SetActionCreators from '../actions/set';
import * as TrackActionCreators from '../actions/track';

export const initialState = {
  result: {
    tracks: []
  },

  meta: {},

  requesting: false,
  errored: false,
  exception: null
};

export const initialTrackState = {
  name: null,

  isPlaying: false,
  isPaused: false,
  isStopped: true,
  isLooped: false,

  region: null,
  startPosition: null,
  endPosition: null,

  effects: {
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

export default function(state = initialState, action) {
  switch (action.type) {
    case SetActionCreators.SET_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case SetActionCreators.SET_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case SetActionCreators.SET_SUCCESS:
      var newState = Object.assign({}, state, {result: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

      action.response.tracks.forEach((track) => {
        newState.meta[track.id] = Object.assign({}, initialTrackState, {
          name: action.response.tracksMeta[track.id].name,

          startPosition: action.response.tracksMeta[track.id].startPosition,
          endPosition: action.response.tracksMeta[track.id].endPosition,
          isLooped: action.response.tracksMeta[track.id].isLooped,

          effects: action.response.tracksMeta[track.id].effects
        });
      });

      return newState;

    case TrackActionCreators.TRACK_HAS_LOADED:
      var newState = Object.assign({}, state);

      newState.meta[action.id].hasLoaded = true;

      return newState;

    case TrackActionCreators.TRACK_PLAY:
      var newState = Object.assign({}, state);

      newState.meta[action.id].isPlaying = true;
      newState.meta[action.id].isPaused = false;
      newState.meta[action.id].isStopped = false;

      return newState;

    case TrackActionCreators.TRACK_PAUSE:
      var newState = Object.assign({}, state);

      newState.meta[action.id].isPlaying = false;
      newState.meta[action.id].isPaused = true;
      newState.meta[action.id].isStopped = false;

      return newState;

    case TrackActionCreators.TRACK_STOP:
      var newState = Object.assign({}, state);

      newState.meta[action.id].isPlaying = false;
      newState.meta[action.id].isPaused = false;
      newState.meta[action.id].isStopped = true;

      return newState;

    case TrackActionCreators.TRACK_TOGGLE_LOOP:
      var newState = Object.assign({}, state);

      newState.meta[action.id].isLooped = !newState.meta[action.id].isLooped;

      return newState;

    case TrackActionCreators.TRACK_SET_REGION:
      var newState = Object.assign({}, state);

      newState.meta[action.id].startPosition = action.params.startPosition;
      newState.meta[action.id].endPosition = action.params.endPosition;

      return newState

    case TrackActionCreators.TRACK_CLEAR_REGION:
      var newState = Object.assign({}, state);

      newState.meta[action.id].startPosition = null;
      newState.meta[action.id].endPosition = null;

      return newState

    case TrackActionCreators.TRACK_SET_EFFECTS:
      var newState = Object.assign({}, state);

      newState.meta[action.id].effects = action.effects;

      return newState;

    default:
      return state;
  }
};
