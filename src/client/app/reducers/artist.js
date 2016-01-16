import _ from 'lodash';
import * as ArtistActionCreators from '../actions/artist';

export const initialState = {
  result: {
    tracks: {
      items: [],
    },
    albums: {
      href: null,
      items: [],
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0
    }
  },

  requesting: false,
  errored: false,
  exception: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ArtistActionCreators.ARTIST_RESET:
      return Object.assign({}, state, initialState);

    case ArtistActionCreators.ARTIST_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case ArtistActionCreators.ARTIST_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case ArtistActionCreators.ARTIST_SUCCESS:
      return Object.assign({}, state, {result: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

    case ArtistActionCreators.ARTIST_PAGING_SUCCESS:
      var pagingState = {
        result: _.extend({}, state.result)
      };

      pagingState.result.albums = action.response.albums;
      pagingState.result.albums.items = state.result.albums.items.concat(action.response.albums.items);

      return Object.assign({}, state, {
        requesting: false,
        errored: false,
        exception: null
      }, pagingState);

    default:
      return state;
  }
};