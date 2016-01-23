import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../../actions/player';
import Waveform from './waveform';
import Add from '../../set/add';

class PlayerBar extends Component {
  constructor() {

  }

  rewind() {

  }

  pause() {

  }

  play() {

  }

  stop() {

  }

  render() {
    var pauseOrPlay;

    if (this.props.player.isPlaying) {
      pauseOrPlay = (
        <span className="pause">
          <a href="#" onClick={this.pause}>
            <i className="fa fa-pause" />
          </a>
        </span>
      );
    }
    else {
      pauseOrPlay = (
        <span className="play">
          <a href="#" onClick={this.play}>
            <i className="fa fa-play" />
          </a>
        </span>
      );
    }

    if (this.props.player.track.id) {
      return (
        <nav className="navbar navbar-default navbar-fixed-bottom playbar">
          <div className="container-fluid">
            <Waveform track={this.props.player.track} />
            <div className="controls">
              <span className="rewind">
                <a href="#" onClick={this.rewind}>
                  <i className="fa fa-fast-backward" />
                </a>
              </span>
              {pauseOrPlay}
              <span className="stop">
                <a href="#" onClick={this.stop}>
                  <i className="fa fa-stop" />
                </a>
              </span>
              <Add track={this.props.player.track} />
            </div>
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