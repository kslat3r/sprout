var React = require('react');
var Route = require('react-router').Route;

module.exports = [
  <Route name="home" path="/" handler={require('../views/home')} />,
  <Route name="artist" path="/artists/:id" handler={require('../views/artist')} />,
  <Route name="artists" path="/artists" handler={require('../views/artists')} />,
  <Route name="login" path="/login" handler={require('../views/login')} />
];