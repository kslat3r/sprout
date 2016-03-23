import * as AddControlActionCreators from '../actions/addControl';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  track: {
    id: null
  },
  context: null
});

export default function(state = initialState, action) {
  switch (action.type) {
    case AddControlActionCreators.ADD_CONTROL_RESET:
      return state.merge(module.exports.initialState);

    case AddControlActionCreators.ADD_CONTROL_OPEN:
      return state.merge({
        track: action.track,
        context: action.context
      });

    default:
      return state;
  }
};
