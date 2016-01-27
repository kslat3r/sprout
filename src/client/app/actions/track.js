import _ from 'lodash';
import { pushState } from 'redux-router';
import fetch from 'isomorphic-fetch';
import * as SetsActions from './sets';

export const TRACK_PLAY = 'TRACK_PLAY';
export const TRACK_STOP = 'TRACK_STOP';
export const TRACK_REQUEST = 'TRACK_REQUEST';
export const TRACK_FAILURE = 'TRACK_FAILURE';
export const TRACK_SUCCESS = 'TRACK_SUCCESS';

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

    dispatch({type: TRACK_REQUEST});

    var fetchParams = _.extend(_.clone(state.config.fetch), getPOSTParams(), {
      body: JSON.stringify({
        track: params.track
      })
    });

    return fetch(state.config.apiUrl + '/sets/' + params.id, fetchParams)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .then(() => dispatch(SetsActions.request()))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function addToNewSet(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: TRACK_REQUEST});

    var fetchParams = _.extend(_.clone(state.config.fetch), getPOSTParams(), {
      body: JSON.stringify({
        track: params.track,
        name: params.name
      })
    });

    return fetch(state.config.apiUrl + '/sets', fetchParams)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .then(() => dispatch(SetsActions.request()))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function updateInSet(params) {
  return function(dispatch, getState) {
    let state = getState();

    var fetchParams = _.extend(_.clone(state.config.fetch), {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, {
      body: JSON.stringify(params.params)
    });

    return fetch(state.config.apiUrl + '/sets/' + state.set.result._id + '/tracks/' + params.id, fetchParams)
      .catch(exception => dispatch(failure(exception)));
  };
};

export function deleteFromSet(params) {
  return function(dispatch, getState) {
    let state = getState();

    var fetchParams = _.extend(_.clone(state.config.fetch), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return fetch(state.config.apiUrl + '/sets/' + state.set.result._id + '/tracks/' + params.id, fetchParams)
      .catch(exception => dispatch(failure(exception)));
  };
};

export function play(id) {
  return {
    type: TRACK_PLAY,
    id
  };
};

export function stop(id) {
  return {
    type: TRACK_STOP,
    id
  };
};

export function failure(exception) {
  return {
    type: TRACK_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: TRACK_SUCCESS,
    response
  };
};