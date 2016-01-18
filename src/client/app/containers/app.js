import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import PlayerBar from '../components/player/bar';

export default class App extends Component {
  render() {
    var header;
    var playerBar;

    if (this.props.user) {
      header = <Header />;
      playerBar = <PlayerBar />;
    }

    return (
      <div>
        {header}
        <div className="container" id="main">
          {this.props.children}
        </div>
        {playerBar}
      </div>
    );
  }
};

export default connect(function(state) {
  return {
    user: state.auth.user
  };
})(App);