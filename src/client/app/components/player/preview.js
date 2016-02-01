import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as PlayerActions from '../../actions/player';

class Preview extends Component {
  constructor() {
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  play(e) {
    e.preventDefault();

    this.props.play(this.props.track);
  }

  pause(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.pause();
  }

  render() {
    if (this.props.track.get('preview_url')) {
      if (this.props.player.getIn(['track', 'id']) === this.props.track.get('id') && this.props.player.get('isPlaying')) {
        return (
          <span className="preview pause">
            <a href="#" onClick={this.pause}>
              <i className="fa fa-pause" />
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
    player: state.get('player')
  };
}, PlayerActions)(Preview);
