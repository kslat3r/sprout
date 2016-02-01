import _ from 'lodash';
import * as AlbumsActionCreators from '../actions/albums';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
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
});

export default function(state = initialState, action) {
  switch (action.type) {
    case AlbumsActionCreators.ALBUMS_RESET:
      return state.merge({
        result: initialState.result
      });

    case AlbumsActionCreators.ALBUMS_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case AlbumsActionCreators.ALBUMS_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case AlbumsActionCreators.ALBUMS_SUCCESS:
      return state.merge({
        result: {
          albums: action.response
        },
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

      return state.merge({
        result: pagingState.result,
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};
