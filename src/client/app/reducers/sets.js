import * as SetsActionCreators from '../actions/sets';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  results: [],

  requesting: false,
  errored: false,
  exception: null
});

export default function(state = initialState, action) {
  switch (action.type) {
    case SetsActionCreators.SETS_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case SetsActionCreators.SETS_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case SetsActionCreators.SETS_SUCCESS:
      return state.merge({
        results: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};
