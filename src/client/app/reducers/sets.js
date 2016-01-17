import * as SetsActionCreators from '../actions/sets';

export const initialState = {
  results: [],

  requesting: false,
  errored: false,
  exception: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SetsActionCreators.SETS_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case SetsActionCreators.SETS_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case SetsActionCreators.SETS_SUCCESS:
      return Object.assign({}, state, {results: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};