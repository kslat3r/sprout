import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../actions/player';
import Wavesurfer from 'react-wavesurfer';

class PlayerBar extends Component {
  constructor() {
    this.state = {
      hasFinished: false
    };

    this.onReady = this.onReady.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  onReady(args) {
    args.wavesurfer.play();
  }

  onFinish() {
    this.setState({
      hasFinished: true
    });
  }

  handlePosChange(args) {
    if (this.state.hasFinished === true) {
      args.wavesurfer.play();

      this.setState({
        hasFinished: false
      });
    }
  }

  render() {
    if (this.props.player.isPlaying) {
      var waveOptions = {
        height: 50,
        progressColor: '#333',
        waveColor: '#999',
        normalize: true
      };

      return (
        <nav className="navbar navbar-default navbar-fixed-bottom playbar">
          <div className="container-fluid">
            <Wavesurfer audioFile={this.props.player.track.preview_url} options={waveOptions} onReady={this.onReady} onFinish={this.onFinish} onPosChange={this.handlePosChange} playing={true} />
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