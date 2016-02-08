import * as PlayerActionCreators from '../actions/player';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  isPlaying: false,
  isPaused: false,
  isStopped: true,
  track: {},
  meta: {}
});

export default function(state = initialState, action) {
  switch (action.type) {
    case PlayerActionCreators.PLAYER_PLAY:
      return state.merge({
        isPlaying: true,
        isPaused: false,
        isStopped: false,
        track: action.track,
        meta: action.meta
      });

    case PlayerActionCreators.PLAYER_PAUSE:
      return state.merge({
        isPlaying: false,
        isPaused: true,
        isStopped: false
      });

    case PlayerActionCreators.PLAYER_STOP:
      return state.merge({
        isPlaying: false,
        isPaused: false,
        isStopped: true
      });

    case PlayerActionCreators.PLAYER_RESET:
      return state.merge(initialState);

    default:
      return state;
  }
};
