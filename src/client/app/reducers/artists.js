import _ from 'lodash';
import * as ArtistsActionCreators from '../actions/artists';

export const initialState = {
  result: {
    artists: {
      href: null,
      items: [],
      limit: 0,
      next: null,
      cursors: {
        after: null
      },
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
    case ArtistsActionCreators.ARTISTS_RESET:
      return Object.assign({}, state, {
        result: initialState.result
      });

    case ArtistsActionCreators.ARTISTS_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case ArtistsActionCreators.ARTISTS_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case ArtistsActionCreators.ARTISTS_SUCCESS:
      return Object.assign({}, state, {result: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

    case ArtistsActionCreators.ARTISTS_PAGING_SUCCESS:
      var pagingState = {
        result: _.extend({}, state.result)
      };

      pagingState.result.artists = action.response.artists;
      pagingState.result.artists.items = state.result.artists.items.concat(action.response.artists.items);

      return Object.assign({}, state, {
        requesting: false,
        errored: false,
        exception: null
      }, pagingState);

    default:
      return state;
  }
};