import fetch from 'isomorphic-fetch';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_RESET = 'SEARCH_RESET'

export function reset() {
  return {
    type: SEARCH_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch(reset());
    dispatch({type: SEARCH_REQUEST});

    return fetch(state.config.apiUrl + '/search?term=' + params.term)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: SEARCH_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: SEARCH_SUCCESS,
    response
  }
};