import * as AlbumActionCreators from '../actions/album';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  result: {
    tracks: {
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
    case AlbumActionCreators.ALBUM_RESET:
      return state.merge(module.exports.initialState);

    case AlbumActionCreators.ALBUM_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case AlbumActionCreators.ALBUM_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case AlbumActionCreators.ALBUM_SUCCESS:
      return state.merge({
        result: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};
