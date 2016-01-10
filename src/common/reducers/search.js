import * as SearchActionCreators from '../actions/search';

export const initialState = {
  term: '',
  results: {
    albums: [],
    artists: [],
    tracks: [],
    length: 0
  },

  isRequesting: false,
  hasErrored: false,
  exception: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SearchActionCreators.SEARCH_RESET:
      return Object.assign({}, state, {
        results: initialState.results,
      });

    case SearchActionCreators.SEARCH_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        hasErrored: false,
        exception: null
      });

    case SearchActionCreators.SEARCH_FAILURE:
      return Object.assign({}, state, {
        isRequesting: false,
        hasErrored: true,
        exception: action.exception
      });

    case SearchActionCreators.SEARCH_SUCCESS:
      return Object.assign({}, state, {results: action.response}, {
        isRequesting: false,
        hasErrored: false,
        exception: null
      });

    default:
      return state;
  }
};