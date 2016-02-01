import fetch from 'isomorphic-fetch';

export const TRACKS_RESET = 'TRACKS_RESET';
export const TRACKS_REQUEST = 'TRACKS_REQUEST';
export const TRACKS_FAILURE = 'TRACKS_FAILURE';
export const TRACKS_SUCCESS = 'TRACKS_SUCCESS';
export const TRACKS_PAGING_SUCCESS = 'TRACKS_PAGING_SUCCESS';

export function reset() {
  return {
    type: TRACKS_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: TRACKS_REQUEST});

    return fetch(state.get('config').apiUrl + '/tracks', state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function paging(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: TRACKS_REQUEST});

    return fetch(state.get('config').apiUrl + '/tracks?offset=' + params.offset + '&limit=' + params.limit, state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(pagingSuccess(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: TRACKS_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: TRACKS_SUCCESS,
    response
  };
};

export function pagingSuccess(response) {
  return {
    type: TRACKS_PAGING_SUCCESS,
    response
  };
}
