import * as ArtistActionCreators from '../actions/artist';

export const initialState = {
  result: {},

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

    default:
      return state;
  }
};