import _ from 'lodash';
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

export function updateTrack(params) {
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

export function deleteTrack(params) {
  return function(dispatch, getState) {
    console.log(this);

    let state = getState();

    var fetchParams = _.extend(_.clone(state.config.fetch), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return fetch(state.config.apiUrl + '/sets/' + state.set.result._id + '/tracks/' + params.id, fetchParams)
      .then(() => dispatch(request({id: state.set.result._id})))
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