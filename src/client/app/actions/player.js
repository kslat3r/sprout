import fetch from 'isomorphic-fetch';

export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_STOP = 'PLAYER_STOP';

export function play(track) {
  return function(dispatch) {
    dispatch({type: PLAYER_STOP});
    dispatch({type: PLAYER_PLAY, track});
  };
};

export function stop() {
  return {
    type: PLAYER_STOP
  };
}