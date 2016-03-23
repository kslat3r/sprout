import _ from 'lodash';
import * as ArtistsActionCreators from '../actions/artists';
import Immutable from 'immutable';

export const initialState = Immutable.Map({
  result: {
    artists: {
      href: null,
      items: [],
      limit: 0,
      next: null,
      cursors: {
        after: null
      },
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
    case ArtistsActionCreators.ARTISTS_RESET:
      return state.merge(module.exports.initialState);

    case ArtistsActionCreators.ARTISTS_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case ArtistsActionCreators.ARTISTS_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case ArtistsActionCreators.ARTISTS_SUCCESS:
      return state.merge({
        result: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    case ArtistsActionCreators.ARTISTS_PAGING_SUCCESS:
      var initialState = state.toJS();
      var pagingState = state.toJS();

      pagingState.result.artists = action.response.artists;
      pagingState.result.artists.items = initialState.result.artists.items.concat(action.response.artists.items);

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
