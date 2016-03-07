import _ from 'lodash';
import * as SetActionCreators from '../actions/set';
import * as TrackActionCreators from '../actions/track';
import * as commonEQModel from '../../../common/models/eq';
import * as commonCompressorModel from '../../../common/models/compressor';
import * as commonDelayModel from '../../../common/models/delay';
import * as commonSequencerModel from '../../../common/models/sequencer';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  result: {
    tracks: []
  },

  meta: {},
  sequencer: {},

  requesting: false,
  errored: false,
  exception: null
});

export const initialMetaState = {
  name: 'Untitled',

  isPlaying: false,
  isPaused: false,
  isStopped: true,
  isLooped: false,
  hasLoaded: false,

  sample: {
    startPosition: null,
    endPosition: null,

    volume: 100,
    pan: 0,

    eq: commonEQModel.defaultState,
    defaultEQ: commonEQModel.defaultState,

    compressor: commonCompressorModel.defaultState,
    defaultCompressor: commonCompressorModel.defaultState,

    delay: commonDelayModel.defaultState,
    defaultDelay: commonDelayModel.defaultState
  }
};

export const initialSequencerState = commonSequencerModel.defaultState;

export default function(state = initialState, action) {
  var mergeState = state.toJS();

  switch (action.type) {
    case SetActionCreators.SET_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case SetActionCreators.SET_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case SetActionCreators.SET_SUCCESS:
      var newState = Object.assign({}, {result: action.response}, {
        meta: {},
        sequencer: {},
        requesting: false,
        errored: false,
        exception: null
      });

      action.response.tracks.forEach((track) => {
        newState.meta[track.id] = Object.assign({}, initialMetaState, {
          name: action.response.meta[track.id].name,
          isLooped: action.response.meta[track.id].isLooped,

          sample: {
            startPosition: action.response.meta[track.id].startPosition,
            endPosition: action.response.meta[track.id].endPosition,

            volume: action.response.meta[track.id].volume,
            pan: action.response.meta[track.id].pan,

            eq: action.response.meta[track.id].eq,
            compressor: action.response.meta[track.id].compressor,
            delay: action.response.meta[track.id].delay
          }
        });

        newState.sequencer[track.id] = Object.assign({}, initialSequencerState, action.response.sequencer[track.id]);
      });

      return state.merge(newState);

    case TrackActionCreators.TRACK_IS_LOADING:
      mergeState.meta[action.id].hasLoaded = false;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_HAS_LOADED:
      mergeState.meta[action.id].hasLoaded = true;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_NAME:
      mergeState.meta[action.id].name = action.name;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_PLAY:
      mergeState.meta[action.id].isPlaying = true;
      mergeState.meta[action.id].isPaused = false;
      mergeState.meta[action.id].isStopped = false;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_PAUSE:
      mergeState.meta[action.id].isPlaying = false;
      mergeState.meta[action.id].isPaused = true;
      mergeState.meta[action.id].isStopped = false;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_STOP:
      mergeState.meta[action.id].isPlaying = false;
      mergeState.meta[action.id].isPaused = false;
      mergeState.meta[action.id].isStopped = true;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_TOGGLE_LOOP:
      mergeState.meta[action.id].isLooped = !mergeState.meta[action.id].isLooped;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_REGION:
      mergeState.meta[action.id].sample.startPosition = action.params.startPosition;
      mergeState.meta[action.id].sample.endPosition = action.params.endPosition;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_CLEAR_REGION:
      mergeState.meta[action.id].sample.startPosition = null;
      mergeState.meta[action.id].sample.endPosition = null;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_PAN:
      mergeState.meta[action.id].sample.pan = action.pan;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_VOLUME:
      mergeState.meta[action.id].sample.volume = action.volume;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_EQ:
      mergeState.meta[action.id].sample.eq = action.eq;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_COMPRESSOR:
      mergeState.meta[action.id].sample.compressor = action.compressor;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_DELAY:
      mergeState.meta[action.id].sample.delay = action.delay;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_SEQUENCE:
      mergeState.sequencer[action.id] = action.sequence;

      return state.merge(mergeState);

    default:
      return state;
  }
};
