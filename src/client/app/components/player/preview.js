import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as PlayerActions from '../../actions/player';

class Preview extends Component {
  constructor() {
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  play(e) {
    e.preventDefault();

    this.props.play(this.props.track);
  }

  stop(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.stop();
  }

  render() {
    if (this.props.track.preview_url) {
      if (this.props.player.track.id === this.props.track.id && this.props.player.isPlaying) {
        return (
          <span className="preview stop">
            <a href="#" onClick={this.stop}>
              <i className="fa fa-stop" />
            </a>
          </span>
        );
      }

      return (
        <span className="preview play">
          <a href="#" onClick={this.play}>
            <i className="fa fa-play" />
          </a>
        </span>
      );
    }

    return false;
  }
};

Preview.propTypes = {
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    player: state.player
  };
}, PlayerActions)(Preview);