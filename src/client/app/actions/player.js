export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_STOP = 'PLAYER_STOP';
export const PLAYER_RESET = 'PLAYER_RESET';

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

export function rewind() {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: PLAYER_STOP});

    if (state.player.isPlaying) {
      setTimeout(() => {
        dispatch({
          type: PLAYER_PLAY,
          track: state.player.get('track').toJS()
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
