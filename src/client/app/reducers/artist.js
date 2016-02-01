import _ from 'lodash';
import * as ArtistActionCreators from '../actions/artist';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  result: {
    tracks: {
      items: [],
    },
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
    case ArtistActionCreators.ARTIST_RESET:
      return state.merge(initialState);

    case ArtistActionCreators.ARTIST_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case ArtistActionCreators.ARTIST_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case ArtistActionCreators.ARTIST_SUCCESS:
      return state.merge({
        result: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    case ArtistActionCreators.ARTIST_PAGING_SUCCESS:
      var pagingState = {
        result: _.extend({}, state.result)
      };

      pagingState.result.albums = action.response.albums;
      pagingState.result.albums.items = state.result.albums.items.concat(action.response.albums.items);

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
