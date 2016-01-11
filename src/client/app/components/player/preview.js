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

    //http://www.willvillanueva.com/the-web-audio-api-from-nodeexpress-to-your-browser/

    this.props.dispatch(PlayerActions.play(this.props.item));
  }

  stop(e) {
    e.preventDefault();

    this.props.dispatch(PlayerActions.stop());
  }

  render() {
    if (this.props.player.track.id === this.props.item.id) {
      return (
        <span>
          &nbsp;<a href="#" onClick={this.stop}>
            <i className="fa fa-stop" />
          </a>
        </span>
      );
    }

    return (
      <span>
        &nbsp;<a href="#" onClick={this.play}>
          <i className="fa fa-play" />
        </a>
      </span>
    );
  }
};

Preview.propTypes = {
  item: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    player: state.player
  };
})(Preview);