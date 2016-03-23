import _ from 'lodash';
import * as SearchActionCreators from '../actions/search';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
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
});

export default function(state = initialState, action) {
  switch (action.type) {
    case SearchActionCreators.SEARCH_RESET:
      return state.merge(module.exports.initialState);

    case SearchActionCreators.SEARCH_UPDATE:
      return state.merge({
        term: action.term
      });

    case SearchActionCreators.SEARCH_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case SearchActionCreators.SEARCH_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case SearchActionCreators.SEARCH_SUCCESS:
      return state.merge({
        results: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    case SearchActionCreators.SEARCH_PAGING_SUCCESS:
      var initialState = state.toJS();
      var pagingState = state.toJS();

      if (action.response.artists) {
        pagingState.results.artists = action.response.artists;
        pagingState.results.artists.items = initialState.results.artists.items.concat(action.response.artists.items);
      }
      else if (action.response.albums) {
        pagingState.results.albums = action.response.albums;
        pagingState.results.albums.items = initialState.results.albums.items.concat(action.response.albums.items);
      }
      else if (action.response.tracks) {
        pagingState.results.tracks = action.response.tracks;
        pagingState.results.tracks.items = initialState.results.tracks.items.concat(action.response.tracks.items);
      }

      state = state.merge(pagingState);

      return state.merge({
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};
