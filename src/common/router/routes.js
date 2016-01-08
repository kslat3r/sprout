var React = require('react');
var Route = require('react-router').Route;

module.exports = [
  <Route name="home" path="/" handler={require('../views/home')} />,
  <Route name="dashboard" path="/dashboard" handler={require('../views/dashboard')} />,
];