import fetch from 'isomorphic-fetch';

export const ALBUM_RESET = 'ALBUM_RESET';
export const ALBUM_REQUEST = 'ALBUM_REQUEST';
export const ALBUM_FAILURE = 'ALBUM_FAILURE';
export const ALBUM_SUCCESS = 'ALBUM_SUCCESS';

export function reset() {
  return {
    type: ALBUM_RESET
  };
};

export function request(params) {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: ALBUM_REQUEST});

    return fetch(state.get('config').apiUrl + '/albums/' + params.id, state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: ALBUM_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: ALBUM_SUCCESS,
    response
  };
};
