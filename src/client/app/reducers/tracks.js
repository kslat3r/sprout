import _ from 'lodash';
import * as TracksActionCreators from '../actions/tracks';
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
    case TracksActionCreators.TRACKS_RESET:
      return state.merge({
        result: initialState.result
      });

    case TracksActionCreators.TRACKS_REQUEST:
      return state.merge({
        requesting: true,
        errored: false,
        exception: null
      });

    case TracksActionCreators.TRACKS_FAILURE:
      return state.merge({
        requesting: false,
        errored: true,
        exception: action.exception
      });

    case TracksActionCreators.TRACKS_SUCCESS:
      return state.merge({
        result: action.response,
        requesting: false,
        errored: false,
        exception: null
      });

    case TracksActionCreators.TRACKS_PAGING_SUCCESS:
      var pagingState = {
        result: _.extend({}, state.result)
      };

      pagingState.result.tracks = action.response.tracks;
      pagingState.result.tracks.items = state.result.tracks.items.concat(action.response.tracks.items);

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
