import _ from 'lodash';
import * as PlaylistActionCreators from '../actions/playlist';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  result: {
    tracks: {
      items: [],
    }
  },

  requesting: false,
  errored: false,
  exception: null
});

export default function(state = initialState, action) {
  switch (action.type) {
    case PlaylistActionCreators.PLAYLIST_RESET:
      return state.merge(module.exports.initialState);

    case PlaylistActionCreators.PLAYLIST_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case PlaylistActionCreators.PLAYLIST_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case PlaylistActionCreators.PLAYLIST_SUCCESS:
      return state.merge({
        result: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    case PlaylistActionCreators.PLAYLIST_PAGING_SUCCESS:
      var initialState = state.toJS();
      var pagingState = state.toJS();

      pagingState.result.tracks = action.response.tracks;
      pagingState.result.tracks.items = initialState.result.tracks.items.concat(action.response.tracks.items);

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
