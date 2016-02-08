export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_STOP = 'PLAYER_STOP';
export const PLAYER_RESET = 'PLAYER_RESET';

export function play(track, meta) {
  return {
    type: PLAYER_PLAY,
    track,
    meta
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

export function rewind() {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: PLAYER_STOP});

    if (state.get('player').toJS().isPlaying) {
      setTimeout(() => {
        dispatch({
          type: PLAYER_PLAY,
          track: state.get('player').toJS().track
        });
      }, 1);
    }
  };
}

export function reset() {
  return {
    type: PLAYER_RESET
  };
}
