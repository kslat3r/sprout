import * as SearchActionCreators from '../actions/search';

export const initialState = {
  results: {
    albums: [],
    artists: [],
    tracks: [],
    length: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SearchActionCreators.SEARCH_RESET:
      return Object.assign({}, state, {
        results: initialState.results
      });

    case SearchActionCreators.SEARCH:
    case SearchActionCreators.SEARCH_FETCH:
    default:
      return state;
  }
};