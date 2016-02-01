import fetch from 'isomorphic-fetch';

export const SETS_REQUEST = 'SETS_REQUEST';
export const SETS_FAILURE = 'SETS_FAILURE';
export const SETS_SUCCESS = 'SETS_SUCCESS';

export function request() {
  return function(dispatch, getState) {
    let state = getState();

    dispatch({type: SETS_REQUEST});

    return fetch(state.get('config').apiUrl + '/sets', state.get('config').fetch)
      .then(response => response.json())
      .then(json => dispatch(success(json)))
      .catch(exception => dispatch(failure(exception)));
  };
};

export function failure(exception) {
  return {
    type: SETS_FAILURE,
    exception
  };
};

export function success(response) {
  return {
    type: SETS_SUCCESS,
    response
  };
};
