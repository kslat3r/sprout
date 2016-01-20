import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../actions/player';
import Wavesurfer from 'react-wavesurfer';

class PlayerBar extends Component {
  constructor() {
    this.onReady = this.onReady.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
  }

  onReady(args) {
    args.wavesurfer.play();
  }

  handleTogglePlay() {

  }

  handlePositionChange() {

  }

  render() {
    if (this.props.player.isPlaying) {
      var waveOptions = {
        height: 100,
        progressColor: '#333',
        waveColor: '#999',
        normalize: true
      };

      return (
        <nav className="navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <Wavesurfer audioFile={this.props.player.track.preview_url} playing={this.props.player.track.isPlaying} options={waveOptions} onReady={this.onReady} />
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