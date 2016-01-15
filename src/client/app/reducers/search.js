import * as SearchActionCreators from '../actions/search';

export const initialState = {
  term: '',
  results: {
    albums: {
      href: null,
      items: [],
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0
    },
    artists: {
      href: null,
      items: [],
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0
    },
    tracks: {
      href: null,
      items: [],
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0
    },
    length: 0
  },

  requesting: false,
  errored: false,
  exception: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SearchActionCreators.SEARCH_RESET:
      return Object.assign({}, state, {
        results: initialState.results
      });

    case SearchActionCreators.SEARCH_UPDATE:
      return Object.assign({}, state, {
        term: action.term
      });

    case SearchActionCreators.SEARCH_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case SearchActionCreators.SEARCH_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case SearchActionCreators.SEARCH_SUCCESS:
      return Object.assign({}, state, {results: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};