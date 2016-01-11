import * as PlayerActionCreators from '../actions/player';

export const initialState = {
  isPlaying: false,
  track: {
    id: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PlayerActionCreators.PLAYER_STOP:
      return Object.assign({}, state, {
        isPlaying: false,
        track: initialState.track
      });

    case PlayerActionCreators.PLAYER_PLAY:
      return Object.assign({}, state, {
        isPlaying: true,
        track: action.track
      });

    default:
      return state;
  }
};