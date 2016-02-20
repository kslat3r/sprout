import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navigation from '../components/navigation';
import PlayerBar from '../components/player/bar';
import * as SetsActions from '../actions/sets';

class App extends Component {
  componentWillMount() {
    this.props.setsActions.request();
  }

  render() {
    var navigation;
    var playerBar;

    if (this.props.user) {
      navigation = <Navigation {...this.props} {...this.state} />;
      playerBar = <PlayerBar {...this.props} {...this.state} />;
    }

    return (
      <div>
        {navigation}
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
