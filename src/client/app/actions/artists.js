import { pushState } from 'redux-router';
import fetch from 'isomorphic-fetch';

export const ARTISTS_RESET = 'ARTISTS_RESET';
export const ARTISTS_REQUEST = 'ARTISTS_REQUEST';
export const ARTISTS_FAILURE = 'ARTISTS_FAILURE';
export const ARTISTS_SUCCESS = 'ARTISTS_SUCCESS';
export const ARTISTS_PAGING_SUCCESS = 'ARTISTS_PAGING_SUCCESS';

export function reset() {
  return {
    type: ARTISTS_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ARTISTS_REQUEST});

    return fetch(state.config.apiUrl + '/artists', state.config.fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function paging(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ARTISTS_REQUEST});

    return fetch(state.config.apiUrl + '/artists?cursor=' + params.cursor, state.config.fetch)
      .then(response => response.json())
      .then(json => dispatch(pagingSuccess(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: ARTISTS_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: ARTISTS_SUCCESS,
    response
  };
};

export function pagingSuccess(response) {
  return {
    type: ARTISTS_PAGING_SUCCESS,
    response
  };
}