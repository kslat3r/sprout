import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as PlayerActions from '../../actions/player';
import Sound from 'react-sound';

class Preview extends Component {
  constructor() {
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  play(e) {
    e.preventDefault();

    this.props.dispatch(PlayerActions.play(this.props.track));
  }

  stop(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.dispatch(PlayerActions.stop());
  }

  render() {
    if (this.props.player.track.id === this.props.track.id) {
      return (
        <span>
          <a href="#" onClick={this.stop}>
            <i className="fa fa-stop" />
          </a>
          <Sound url={this.props.player.track.preview_url} playStatus={Sound.status.PLAYING} onFinishedPlaying={this.stop} />
        </span>
      );
    }

    return (
      <span>
        <a href="#" onClick={this.play}>
          <i className="fa fa-play" />
        </a>
      </span>
    );
  }
};

Preview.propTypes = {
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    player: state.player
  };
})(Preview);