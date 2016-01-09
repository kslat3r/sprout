import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import configReducer from './config';
import authReducer from './auth';
import searchReducer from './search';

export default combineReducers({
  router: routerStateReducer,
  config: configReducer,
  auth: authReducer,
  search: searchReducer
});