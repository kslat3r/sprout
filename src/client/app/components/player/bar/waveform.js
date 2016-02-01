import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../../actions/player';

export default class PlayerBarWaveform extends Component {
  constructor(props) {
    super(props);

    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    this.ws = Object.create(WaveSurfer);
  }

  componentDidMount() {
    this.ws.init({
      container: this.refs.wavesurfer,
      height: 30,
      cursorColor: '#FFCB05'
    });

    this.ws.load(this.props.track.get('preview_url'));

    this.ws.on('ready', () => {
      this.ws.play();
    }.bind(this));

    this.ws.on('finish', () => {
      this.props.playerActions.stop();
    }.bind(this));
  }

  componentWillUnmount() {
    this.ws.destroy();
    this.ws = undefined;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.track.get('id') !== nextProps.track.get('id')) {
      this.ws.load(nextProps.track.get('preview_url'));
    }

    if (nextProps.player.get('isPaused')) {
      this.ws.pause();
    }
    else if (nextProps.player.get('isPlaying')) {
      if (this.props.track.get('id') === nextProps.track.get('id')) {
        this.ws.play();
      }
    }
    else if (nextProps.player.get('isStopped')) {
      this.ws.stop();
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
    player: state.getIn(['player'])
  };
}, function(dispatch) {
  return {
    playerActions: bindActionCreators(PlayerActions, dispatch)
  };
})(PlayerBarWaveform);
