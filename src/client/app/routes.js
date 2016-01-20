import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './containers/app';
import Home from './containers/home';
import Search from './containers/search';
import Artists from './containers/artists';
import Artist from './containers/artist';
import Albums from './containers/albums';
import Album from './containers/album';
import Playlists from './containers/playlists';
import Playlist from './containers/playlist';
import Sets from './containers/sets';
import Set from './containers/set';
import Tracks from './containers/tracks';

export default (
  <Router>
    <Route name="app" path="/" component={App}>
      <IndexRoute name="home" component={Home} />
      <Route name="search" path="search" component={Search} />
      <Route name="artists" path="artists" component={Artists} />
      <Route name="artist" path="artists/:id" component={Artist} />
      <Route name="albums" path="albums" component={Albums} />
      <Route name="album" path="albums/:id" component={Album} />
      <Route name="playlists" path="playlists" component={Playlists} />
      <Route name="playlist" path="playlists/:id" component={Playlist} />
      <Route name="sets" path="sets" component={Sets} />
      <Route name="set" path="sets/:id" component={Set} />
      <Route name="tracks" path="tracks" component={Tracks} />
    </Route>
  </Router>
);