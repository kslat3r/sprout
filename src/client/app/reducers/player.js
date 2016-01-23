import * as PlayerActionCreators from '../actions/player';

export const initialState = {
  isPlaying: false,
  isPaused: false,
  isStopped: true,
  track: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PlayerActionCreators.PLAYER_PLAY:
      return Object.assign({}, state, {
        isPlaying: true,
        isPaused: false,
        isStopped: false,
        track: action.track
      });

    case PlayerActionCreators.PLAYER_PAUSE:
      return Object.assign({}, state, {
        isPlaying: false,
        isPaused: true,
        isStopped: false
      });

    case PlayerActionCreators.PLAYER_STOP:
      return Object.assign({}, state, {
        isPlaying: false,
        isPaused: false,
        isStopped: true
      });

    default:
      return state;
  }
};