import fetch from 'isomorphic-fetch';

export const PLAYLISTS_RESET = 'PLAYLISTS_RESET';
export const PLAYLISTS_REQUEST = 'PLAYLISTS_REQUEST';
export const PLAYLISTS_FAILURE = 'PLAYLISTS_FAILURE';
export const PLAYLISTS_SUCCESS = 'PLAYLISTS_SUCCESS';
export const PLAYLISTS_PAGING_SUCCESS = 'PLAYLISTS_PAGING_SUCCESS';

export function reset() {
  return {
    type: PLAYLISTS_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: PLAYLISTS_REQUEST});

    return fetch(state.get('config').apiUrl + '/playlists', state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function paging(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: PLAYLISTS_REQUEST});

    return fetch(state.get('config').apiUrl + '/playlists?offset=' + params.offset + '&limit=' + params.limit, state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(pagingSuccess(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: PLAYLISTS_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: PLAYLISTS_SUCCESS,
    response
  };
};

export function pagingSuccess(response) {
  return {
    type: PLAYLISTS_PAGING_SUCCESS,
    response
  };
}
