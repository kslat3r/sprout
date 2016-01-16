import _ from 'lodash';
import * as PlaylistActionCreators from '../actions/playlist';

export const initialState = {
  result: {
    tracks: {
      items: [],
    }
  },

  requesting: false,
  errored: false,
  exception: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PlaylistActionCreators.PLAYLIST_RESET:
      return Object.assign({}, state, initialState);

    case PlaylistActionCreators.PLAYLIST_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case PlaylistActionCreators.PLAYLIST_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case PlaylistActionCreators.PLAYLIST_SUCCESS:
      return Object.assign({}, state, {result: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

    case PlaylistActionCreators.PLAYLIST_PAGING_SUCCESS:
      var pagingState = {
        result: _.extend({}, state.result)
      };

      pagingState.result.tracks = action.response.tracks;
      pagingState.result.tracks.items = state.result.tracks.items.concat(action.response.tracks.items);

      return Object.assign({}, state, {
        requesting: false,
        errored: false,
        exception: null
      }, pagingState);

    default:
      return state;
  }
};