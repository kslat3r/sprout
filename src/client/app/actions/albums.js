import fetch from 'isomorphic-fetch';

export const ALBUMS_RESET = 'ALBUMS_RESET';
export const ALBUMS_REQUEST = 'ALBUMS_REQUEST';
export const ALBUMS_FAILURE = 'ALBUMS_FAILURE';
export const ALBUMS_SUCCESS = 'ALBUMS_SUCCESS';
export const ALBUMS_PAGING_SUCCESS = 'ALBUMS_PAGING_SUCCESS';

export function reset() {
  return {
    type: ALBUMS_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ALBUMS_REQUEST});

    return fetch(state.get('config').apiUrl + '/albums', state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function paging(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ALBUMS_REQUEST});

    return fetch(state.get('config').apiUrl + '/albums?offset=' + params.offset + '&limit=' + params.limit, state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(pagingSuccess(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: ALBUMS_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: ALBUMS_SUCCESS,
    response
  };
};

export function pagingSuccess(response) {
  return {
    type: ALBUMS_PAGING_SUCCESS,
    response
  };
}
