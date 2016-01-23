import fetch from 'isomorphic-fetch';

export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_STOP = 'PLAYER_STOP';

export function play(track) {
  return {
    type: PLAYER_PLAY,
    track
  }
};

export function pause() {
  return {
    type: PLAYER_PAUSE
  };
}

export function stop() {
  return {
    type: PLAYER_STOP
  };
}