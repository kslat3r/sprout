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
      return state.merge(initialState);

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
      var initialState = state.toJS();
      var pagingState = state.toJS();

      pagingState.result.albums = action.response;
      pagingState.result.albums.items = initialState.result.albums.items.concat(action.response.items);

      state = state.merge(pagingState);

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
