import { pushState } from 'redux-router';
import fetch from 'isomorphic-fetch';

export const SET_REQUEST = 'SET_REQUEST';
export const SET_FAILURE = 'SET_FAILURE';
export const SET_SUCCESS = 'SET_SUCCESS';

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: SET_REQUEST});

    return fetch(state.config.apiUrl + '/sets/' + params.id, state.config.fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: SET_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: SET_SUCCESS,
    response
  };
};