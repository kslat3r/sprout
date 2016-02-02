import fetch from 'isomorphic-fetch';

export const ARTIST_RESET = 'ARTIST_RESET';
export const ARTIST_REQUEST = 'ARTIST_REQUEST';
export const ARTIST_FAILURE = 'ARTIST_FAILURE';
export const ARTIST_SUCCESS = 'ARTIST_SUCCESS';
export const ARTIST_PAGING_SUCCESS = 'ARTIST_PAGING_SUCCESS';

export function reset() {
  return {
    type: ARTIST_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ARTIST_REQUEST});

    return fetch(state.get('config').apiUrl + '/artists/' + params.id, state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function paging(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ARTIST_REQUEST});

    return fetch(state.get('config').apiUrl + '/artists/' + params.id + '?offset=' + params.offset + '&limit=' + params.limit, state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(pagingSuccess(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: ARTIST_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: ARTIST_SUCCESS,
    response
  };
};

export function pagingSuccess(response) {
  return {
    type: ARTIST_PAGING_SUCCESS,
    response
  };
};
