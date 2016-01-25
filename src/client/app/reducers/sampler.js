export const initialState = {
  isPlaying: false,
  isPaused: false,
  isStopped: true,
  isLooped: false,
  showEQ: false,

  EQ: [{
    f: 32,
    type: 'lowshelf'
  },
  {
    f: 64,
    type: 'peaking'
  },
  {
    f: 125,
    type: 'peaking'
  },
  {
    f: 250,
    type: 'peaking'
  },
  {
    f: 500,
    type: 'peaking'
  },
  {
    f: 1000,
    type: 'peaking'
  },
  {
    f: 2000,
    type: 'peaking'
  },
  {
    f: 4000,
    type: 'peaking'
  },
  {
    f: 8000,
    type: 'peaking'
  },
  {
    f: 16000,
    type: 'highshelf'
  }],
  filters: [],

  wsOptions: {
    height: 60,
    progressColor: '#999',
    cursorColor: '#FFCB05'
  },

  dragOptions: {
    loop: false,
    resize: true,
    drag: true,
    color: 'rgba(255, 203, 5, 0.4)'
  },

  region: null
};

export default function() {
  return initialState;
};