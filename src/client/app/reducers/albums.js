import _ from 'lodash';
import * as AlbumsActionCreators from '../actions/albums';

export const initialState = {
  result: {
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
    case AlbumsActionCreators.ALBUMS_RESET:
      return Object.assign({}, state, {
        result: initialState.result
      });

    case AlbumsActionCreators.ALBUMS_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case AlbumsActionCreators.ALBUMS_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case AlbumsActionCreators.ALBUMS_SUCCESS:
      return Object.assign({}, state, {
        result: {
          albums: action.response
        }
      }, {
        requesting: false,
        errored: false,
        exception: null
      });

    case AlbumsActionCreators.ALBUMS_PAGING_SUCCESS:
      var pagingState = {
        result: _.extend({}, state.result)
      };

      pagingState.result.albums = action.response;
      pagingState.result.albums.items = state.result.albums.items.concat(action.response.items);

      return Object.assign({}, state, {
        requesting: false,
        errored: false,
        exception: null
      }, pagingState);

    default:
      return state;
  }
};