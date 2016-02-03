import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/header';
import PlayerBar from '../components/player/bar';
import * as SetsActions from '../actions/sets';

export default class App extends Component {
  componentWillMount() {
    this.props.setsActions.request();
  }

  render() {
    var header;
    var playerBar;

    if (this.props.user) {
      header = <Header {...this.props} {...this.state} />;
      playerBar = <PlayerBar {...this.props} {...this.state} />;
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
    user: state.get('auth').user
  };
}, function(dispatch) {
  return {
    setsActions: bindActionCreators(SetsActions, dispatch)
  };
})(App);
