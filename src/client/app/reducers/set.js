import * as SetActionCreators from '../actions/set';
import * as TrackActionCreators from '../actions/track';
import * as EffectsReducer from './effects';

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

  effects: EffectsReducer.initialState
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
