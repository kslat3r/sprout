import { combineReducers } from 'redux-immutable';
import routeReducer from './route';
import configReducer from './config';
import authReducer from './auth';
import searchReducer from './search';
import playerReducer from './player';
import artistReducer from './artist';
import artistsReducer from './artists';
import albumReducer from './album';
import albumsReducer from './albums';
import playlistsReducer from './playlists';
import playlistReducer from './playlist';
import addControlReducer from './addControl';
import setsReducer from './sets';
import setReducer from './set';
import tracksReducer from './tracks';
import samplerReducer from './sampler';

export default combineReducers({
  routing: routeReducer,
  config: configReducer,
  auth: authReducer,
  search: searchReducer,
  player: playerReducer,
  artist: artistReducer,
  artists: artistsReducer,
  album: albumReducer,
  albums: albumsReducer,
  playlists: playlistsReducer,
  playlist: playlistReducer,
  addControl: addControlReducer,
  sets: setsReducer,
  set: setReducer,
  tracks: tracksReducer,
  sampler: samplerReducer
});
