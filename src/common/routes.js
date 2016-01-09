import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './containers/home';
import Dashboard from './containers/dashboard';

export default (
  <Route name="home" path="/" component={Home}>
    <Route name="dashboard" path="/dashboard" component={Dashboard} />
  </Route>
);