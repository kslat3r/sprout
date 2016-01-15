import { pushState } from 'redux-router';
import fetch from 'isomorphic-fetch';

export const ARTIST_RESET = 'ARTIST_RESET';
export const ARTIST_REQUEST = 'ARTIST_REQUEST';
export const ARTIST_FAILURE = 'ARTIST_FAILURE';
export const ARTIST_SUCCESS = 'ARTIST_SUCCESS';

export function reset() {
  return {
    type: ARTIST_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ARTIST_REQUEST});

    return fetch(state.config.apiUrl + '/artists/' + params.id, state.config.fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: ARTIST_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: ARTIST_SUCCESS,
    response
  };
};