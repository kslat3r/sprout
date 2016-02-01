import Immutable from 'immutable';

export const initialState = Immutable.Map({
  wsOptions: {
    height: 100,
    progressColor: '#999',
    cursorColor: '#FFCB05'
  },

  dragOptions: {
    loop: false,
    resize: true,
    drag: true,
    color: 'rgba(255, 203, 5, 0.4)'
  },

  region: null,
});

export default function() {
  return initialState;
};
