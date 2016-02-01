import * as SetActionCreators from '../actions/set';
import * as TrackActionCreators from '../actions/track';
import * as EffectsReducer from './effects';
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

export const initialTrackState = Immutable.Map({
  name: null,

  isPlaying: false,
  isPaused: false,
  isStopped: true,
  isLooped: false,

  region: null,
  startPosition: null,
  endPosition: null,

  effects: EffectsReducer.initialState
});

export default function(state = initialState, action) {
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

          effects: action.response.tracksMeta[track.id].effects
        });
      });

      return state.merge(newState);

    case TrackActionCreators.TRACK_HAS_LOADED:
      return state.merge({
        meta: {
          [action.id]: {
            hasLoaded: true
          }
        }
      });

    case TrackActionCreators.TRACK_PLAY:
      return state.merge({
        meta: {
          [action.id]: {
            isPlaying: true,
            isPaused: false,
            isStopped: false
          }
        }
      });

    case TrackActionCreators.TRACK_PAUSE:
      return state.merge({
        meta: {
          [action.id]: {
            isPlaying: false,
            isPaused: true,
            isStopped: false
          }
        }
      });

    case TrackActionCreators.TRACK_STOP:
      return state.merge({
        meta: {
          [action.id]: {
            isPlaying: false,
            isPaused: false,
            isStopped: true
          }
        }
      });

    case TrackActionCreators.TRACK_TOGGLE_LOOP:
      return state.merge({
        meta: {
          [action.id]: {
            isLooped: !state.meta[action.id].isLooped
          }
        }
      });

    case TrackActionCreators.TRACK_SET_REGION:
      return state.merge({
        meta: {
          [action.id]: {
            startPosition: action.params.startPosition,
            endPosition: action.params.endPosition
          }
        }
      });

    case TrackActionCreators.TRACK_CLEAR_REGION:
    return state.merge({
      meta: {
        [action.id]: {
          startPosition: null,
          endPosition: null
        }
      }
    });

    case TrackActionCreators.TRACK_SET_EFFECTS:
    return state.merge({
      meta: {
        [action.id]: {
          effects: action.effects
        }
      }
    });

    default:
      return state;
  }
};
