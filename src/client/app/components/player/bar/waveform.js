import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../../actions/player';

export default class PlayerBarWaveform extends Component {
  constructor() {

  }

  componentDidMount() {
    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    WaveSurfer.init({
      container: this.refs.wavesurfer,
      height: 50,
      progressColor: this.props.drag ? '#999' : '#555',
    });

    if (this.props.drag) {
      WaveSurfer.enableDragSelection({
        loop: true,
        resize: true,
        drag: false
      });
    }

    WaveSurfer.load(this.props.track.preview_url);

    WaveSurfer.on('ready', () => {
      WaveSurfer.play();
    }.bind(this));

    WaveSurfer.on('finish', () => {
      this.props.playerActions.stop();
    }.bind(this));

    if (this.props.drag) {
      WaveSurfer.on('region-created', (Region) => {
        if (this.state.region) {
          this.state.region.remove();
        }

        this.setState({
          region: Region
        });
      }.bind(this));
    }
  }

  componentWillUnmount() {
    WaveSurfer.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.track.id !== nextProps.track.id) {
      WaveSurfer.load(nextProps.track.preview_url);
    }

    if (nextProps.player.isPaused) {
      WaveSurfer.pause();
    }
    else if (nextProps.player.isPlaying) {
      WaveSurfer.play();
    }
    else if (nextProps.player.isStopped) {
      WaveSurfer.stop();
    }
  }

  render() {
    return (
      <div ref="wavesurfer" className="waveform" />
    );
  }
}

PlayerBarWaveform.propTypes = {
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    player: state.player
  };
}, function(dispatch) {
  return {
    playerActions: bindActionCreators(PlayerActions, dispatch)
  };
})(PlayerBarWaveform);