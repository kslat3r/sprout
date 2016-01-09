export const SEARCH = 'SEARCH'
export const SEARCH_FETCH = 'SEARCH_FETCH';
export const SEARCH_RESET = 'SEARCH_RESET'

export function reset() {
  return {
    type: SEARCH_RESET
  }
};

export function search(params) {
  return {
    type: SEARCH_FETCH,
    params
  }
};