import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import * as SetsActions from './sets';
import * as SetActions from './set';

export const TRACK_IS_LOADING = 'TRACK_IS_LOADING';
export const TRACK_HAS_LOADED = 'TRACK_HAS_LOADED';
export const TRACK_SET_NAME = 'TRACK_SET_NAME';
export const TRACK_PLAY = 'TRACK_PLAY';
export const TRACK_PAUSE = 'TRACK_PAUSE';
export const TRACK_STOP = 'TRACK_STOP';
export const TRACK_TOGGLE_LOOP = 'TRACK_TOGGLE_LOOP';
export const TRACK_SET_REGION = 'TRACK_SET_REGION';
export const TRACK_CLEAR_REGION = 'TRACK_CLEAR_REGION';
export const TRACK_SET_PAN = 'TRACK_SET_PAN';
export const TRACK_SET_VOLUME = 'TRACK_SET_VOLUME';
export const TRACK_SET_EQ = 'TRACK_SET_EQ';
export const TRACK_SET_COMPRESSOR = 'TRACK_SET_COMPRESSOR';
export const TRACK_SET_DELAY = 'TRACK_SET_DELAY';
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

    var fetchParams = _.extend(_.clone(state.get('config').fetch), getPOSTParams(), {
      body: JSON.stringify({
        track: params.track
      })
    });

    return fetch(state.get('config').apiUrl + '/sets/' + params.id, fetchParams)
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

    var fetchParams = _.extend(_.clone(state.get('config').fetch), getPOSTParams(), {
      body: JSON.stringify({
        track: params.track,
        name: params.name
      })
    });

    return fetch(state.get('config').apiUrl + '/sets', fetchParams)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .then(() => dispatch(SetsActions.request()))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function updateInSet(id, params) {
  return function(dispatch, getState) {
    let state = getState();

    var fetchParams = _.extend(_.clone(state.get('config').fetch), {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, {
      body: JSON.stringify(params)
    });

    return fetch(state.get('config').apiUrl + '/sets/' + state.toJS().set.result._id + '/tracks/' + id, fetchParams)
      .catch(exception => dispatch(failure(exception)));
  };
};

export function deleteFromSet(id) {
  return function(dispatch, getState) {
    let state = getState();

    var fetchParams = _.extend(_.clone(state.get('config').fetch), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return fetch(state.get('config').apiUrl + '/sets/' + state.toJS().set.result._id + '/tracks/' + id, fetchParams)
      .then(() => {
        dispatch(SetActions.request({
          id: state.set.toJS().result._id
        }));
      })
      .catch(exception => dispatch(failure(exception)));
  };
};

export function isLoading(id) {
  return {
    type: TRACK_IS_LOADING,
    id
  };
}

export function hasLoaded(id) {
  return {
    type: TRACK_HAS_LOADED,
    id
  };
}

export function setName(id, name) {
  return {
    type: TRACK_SET_NAME,
    id,
    name
  };
}

export function play(id) {
  return {
    type: TRACK_PLAY,
    id
  };
};

export function pause(id) {
  return {
    type: TRACK_PAUSE,
    id
  };
};

export function stop(id) {
  return {
    type: TRACK_STOP,
    id
  };
};

export function toggleLoop(id) {
  return {
    type: TRACK_TOGGLE_LOOP,
    id
  };
};

export function setRegion(id, params) {
  return {
    type: TRACK_SET_REGION,
    id,
    params
  };
};

export function clearRegion(id) {
  return {
    type: TRACK_CLEAR_REGION,
    id
  };
};

export function setPan(id, pan) {
  return {
    type: TRACK_SET_PAN,
    id,
    pan
  };
};

export function setVolume(id, volume) {
  return {
    type: TRACK_SET_VOLUME,
    id,
    volume
  };
};

export function setEQ(id, eq) {
  return {
    type: TRACK_SET_EQ,
    id,
    eq
  };
};

export function setCompressor(id, compressor) {
  return {
    type: TRACK_SET_COMPRESSOR,
    id,
    compressor
  };
};

export function setDelay(id, delay) {
  return {
    type: TRACK_SET_DELAY,
    id,
    delay
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
