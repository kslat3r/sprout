import * as SetActionCreators from '../actions/set';

export const initialState = {
  result: {},

  requesting: false,
  errored: false,
  exception: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SetActionCreators.SET_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case SetActionCreators.SET_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case SetActionCreators.SET_SUCCESS:
      return Object.assign({}, state, {result: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};