import * as SetActionCreators from '../actions/set';
import * as TrackActionCreators from '../actions/track';
import * as commonEQModel from '../../../common/models/eq';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  result: {
    tracks: []
  },

  meta: {},

  requesting: false,
  errored: false,
  exception: null
});

export const initialTrackState = {
  name: null,

  isPlaying: false,
  isPaused: false,
  isStopped: true,
  isLooped: false,

  region: null,
  startPosition: null,
  endPosition: null,

  volume: 100,
  pan: 0,

  eq: commonEQModel.defaultState,
  defaultEQ: commonEQModel.defaultState
};

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

          pan: action.response.tracksMeta[track.id].pan,
          volume: action.response.tracksMeta[track.id].volume,
          eq: action.response.tracksMeta[track.id].eq
        });
      });

      return state.merge(newState);

    case TrackActionCreators.TRACK_HAS_LOADED:
      mergeState.meta[action.id].hasLoaded = true;

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
      mergeState.meta[action.id].startPosition = action.params.startPosition;
      mergeState.meta[action.id].endPosition = action.params.endPosition;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_CLEAR_REGION:
      mergeState.meta[action.id].startPosition = null;
      mergeState.meta[action.id].endPosition = null;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_PAN:
      mergeState.meta[action.id].pan = action.pan;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_VOLUME:
      mergeState.meta[action.id].volume = action.volume;

      return state.merge(mergeState);

    case TrackActionCreators.TRACK_SET_EQ:
      mergeState.meta[action.id].eq = action.eq;

      return state.merge(mergeState);

    default:
      return state;
  }
};
