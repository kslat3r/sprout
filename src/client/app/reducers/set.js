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

  region: null,
  startPosition: null,
  endPosition: null,
  isLooped: false,

  EQ: [{
    f: 32,
    type: 'lowshelf'
  },
  {
    f: 64,
    type: 'peaking'
  },
  {
    f: 125,
    type: 'peaking'
  },
  {
    f: 250,
    type: 'peaking'
  },
  {
    f: 500,
    type: 'peaking'
  },
  {
    f: 1000,
    type: 'peaking'
  },
  {
    f: 2000,
    type: 'peaking'
  },
  {
    f: 4000,
    type: 'peaking'
  },
  {
    f: 8000,
    type: 'peaking'
  },
  {
    f: 16000,
    type: 'highshelf'
  }],

  filters: []
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
          isLooped: action.response.tracksMeta[track.id].loop,

          EQ: initialTrackState.EQ.map((filter) => {
            filter.value = action.response.tracksMeta[track.id].eq[filter.f];

            return filter;
          })
        });
      });

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

    case TrackActionCreators.TRACK_SET_FILTERS:
      var newState = Object.assign({}, state);

      newState.meta[action.id].filters = action.filters;

      return newState;

    default:
      return state;
  }
};