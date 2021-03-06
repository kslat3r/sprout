import _ from 'lodash';
import * as PlaylistsActionCreators from '../actions/playlists';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  result: {
    playlists: {
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
    case PlaylistsActionCreators.PLAYLISTS_RESET:
      return state.merge(module.exports.initialState);

    case PlaylistsActionCreators.PLAYLISTS_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case PlaylistsActionCreators.PLAYLISTS_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case PlaylistsActionCreators.PLAYLISTS_SUCCESS:
      return state.merge({
        result: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    case PlaylistsActionCreators.PLAYLISTS_PAGING_SUCCESS:
      var initialState = state.toJS();
      var pagingState = state.toJS();

      pagingState.result.playlists = action.response.playlists;
      pagingState.result.playlists.items = initialState.result.playlists.items.concat(action.response.playlists.items);

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
