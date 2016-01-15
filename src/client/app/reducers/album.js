import * as AlbumActionCreators from '../actions/album';

export const initialState = {
  result: {},

  requesting: false,
  errored: false,
  exception: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AlbumActionCreators.ALBUM_RESET:
      return Object.assign({}, state, initialState);

    case AlbumActionCreators.ALBUM_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        errored: false,
        exception: null
      });

    case AlbumActionCreators.ALBUM_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case AlbumActionCreators.ALBUM_SUCCESS:
      return Object.assign({}, state, {result: action.response}, {
        requesting: false,
        errored: false,
        exception: null
      });

    default:
      return state;
  }
};