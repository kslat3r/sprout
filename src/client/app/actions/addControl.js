import fetch from 'isomorphic-fetch';

export const ADD_CONTROL_RESET = 'ADD_CONTROL_RESET';
export const ADD_CONTROL_OPEN = 'ADD_CONTROL_OPEN';

export function reset() {
  return {
    type: ADD_CONTROL_RESET
  };
}

export function open(params) {
  return {
    type: ADD_CONTROL_OPEN,
    track: params.track,
    context: params.context
  };
};
