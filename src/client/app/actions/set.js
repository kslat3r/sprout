import _ from 'lodash';
import { pushState } from 'redux-router';
import fetch from 'isomorphic-fetch';

export const SET_REQUEST = 'SET_REQUEST';
export const SET_FAILURE = 'SET_FAILURE';
export const SET_SUCCESS = 'SET_SUCCESS';

function getPOSTParams() {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
};

export function addToExistingSet(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: SET_REQUEST});

    var fetchParams = _.extend(state.config.fetch, getPOSTParams(), {
      body: JSON.stringify({
        track: params.track
      })
    });

    return fetch(state.config.apiUrl + '/sets/' + params.set.id, fetchParams)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function addToNewSet(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: SET_REQUEST});

    var fetchParams = _.extend(state.config.fetch, getPOSTParams(), {
      body: JSON.stringify({
        track: params.track,
        name: params.name
      })
    });

    return fetch(state.config.apiUrl + '/sets', fetchParams)
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