import { pushState } from 'redux-router';
import fetch from 'isomorphic-fetch';

export const SEARCH_RESET = 'SEARCH_RESET';
export const SEARCH_UPDATE = 'SEARCH_UPDATE';
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';


export function reset() {
  return {
    type: SEARCH_RESET
  };
};

export function update(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({
      type: SEARCH_UPDATE,
      term: params.term
    });
  };
}

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch(reset());
    dispatch({type: SEARCH_REQUEST});
    dispatch(pushState(null, state.router.location.pathname, {searchTerm: state.search.term}));

    return fetch(state.config.apiUrl + '/search?term=' + state.search.term, state.config.fetch)
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
  };
};