import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import Home from './containers/home';
import Dashboard from './containers/dashboard';
import Search from './containers/search';
import Artist from './containers/artist';
import Album from './containers/album';

export default (
  <Router>
    <Route name="home" path="/" component={Home} />
    <Route name="dashboard" path="/dashboard" component={Dashboard} />
    <Route name="search" path="/search" component={Search} />
    <Route name="artist" path="/artists/:id" component={Artist} />
    <Route name="album" path="/albums/:id" component={Album} />
  </Router>
);