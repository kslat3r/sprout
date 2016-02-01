import Immutable from 'immutable';

export const initialState = Immutable.Map({});

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};
