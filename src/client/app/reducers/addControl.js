import * as AddControlActionCreators from '../actions/addControl';

export const initialState = {
  track: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AddControlActionCreators.ADD_CONTROL_RESET:
      return Object.assign({}, state, {
        track: initialState.track
      });

    case AddControlActionCreators.ADD_CONTROL_OPEN:
      return Object.assign({}, state, {
        track: action.track
      });

    default:
      return state;
  }
};