import * as SetActionCreators from '../actions/set';

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
  }]
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

    default:
      return state;
  }
};