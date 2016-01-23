import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../actions/player';
import Waveform from './waveform';

class PlayerBar extends Component {
  constructor() {

  }

  render() {
    if (this.props.player.track.id) {
      return (
        <nav className="navbar navbar-default navbar-fixed-bottom playbar">
          <div className="container-fluid">
            <Waveform track={this.props.player.track} />
          </div>
        </nav>
      );
    }

    return false;
  }
};

PlayerBar.propTypes = {};

export default connect(function(state) {
  return {
    player: state.player
  };
}, function(dispatch) {
  return {
    playerActions: bindActionCreators(PlayerActions, dispatch)
  };
})(PlayerBar);