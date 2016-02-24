import createLogger from 'redux-logger';

export default createLogger({
  collapsed: true,
  stateTransformer: (state) => {
    return state.toJS();
  }
});
