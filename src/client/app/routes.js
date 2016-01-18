import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './containers/app';
import Home from './containers/home';
import Dashboard from './containers/dashboard';
import Search from './containers/search';
import Artist from './containers/artist';
import Album from './containers/album';
import Playlists from './containers/playlists';
import Playlist from './containers/playlist';
import Sets from './containers/sets';
import Set from './containers/set';

export default (
  <Router>
    <Route name="app" path="/" component={App}>
      <IndexRoute name="home" component={Home} />
      <Route name="dashboard" path="dashboard" component={Dashboard} />
      <Route name="search" path="search" component={Search} />
      <Route name="artist" path="artists/:id" component={Artist} />
      <Route name="album" path="albums/:id" component={Album} />
      <Route name="playlists" path="playlists" component={Playlists} />
      <Route name="playlist" path="playlists/:id" component={Playlist} />
      <Route name="sets" path="sets" component={Sets} />
      <Route name="set" path="sets/:id" component={Set} />
    </Route>
  </Router>
);