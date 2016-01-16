import { pushState } from 'redux-router';
import fetch from 'isomorphic-fetch';

export const PLAYLIST_RESET = 'PLAYLIST_RESET';
export const PLAYLIST_REQUEST = 'PLAYLIST_REQUEST';
export const PLAYLIST_FAILURE = 'PLAYLIST_FAILURE';
export const PLAYLIST_SUCCESS = 'PLAYLIST_SUCCESS';
export const PLAYLIST_PAGING_SUCCESS = 'PLAYLIST_PAGING_SUCCESS';

export function reset() {
  return {
    type: PLAYLIST_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: PLAYLIST_REQUEST});

    return fetch(state.config.apiUrl + '/playlists/' + params.id, state.config.fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function paging(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: PLAYLIST_REQUEST});

    return fetch(state.config.apiUrl + '/playlists/' + params.id + '?offset=' + params.offset + '&limit=' + params.limit, state.config.fetch)
      .then(response => response.json())
      .then(json => dispatch(pagingSuccess(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: PLAYLIST_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: PLAYLIST_SUCCESS,
    response
  };
};

export function pagingSuccess(response) {
  return {
    type: PLAYLIST_PAGING_SUCCESS,
    response
  };
}