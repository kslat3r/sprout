import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import configReducer from './config';
import authReducer from './auth';
import searchReducer from './search';
import playerReducer from './player';
import artistReducer from './artist';
import albumReducer from './album';

export default combineReducers({
  router: routerStateReducer,
  config: configReducer,
  auth: authReducer,
  search: searchReducer,
  player: playerReducer,
  artist: artistReducer,
  album: albumReducer
});