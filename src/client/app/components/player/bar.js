import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../actions/player';

class PlayerBar extends Component {
  constructor() {
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  play(e) {
    e.preventDefault();

    this.props.playerActions.play(this.props.player.track);
  }

  stop(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.playerActions.stop();
  }

  render() {
    var content;

    if (this.props.player.isPlaying) {
      content = (
        <span className="preview stop">
          <a href="#" onClick={this.stop}>
            <i className="fa fa-stop" />
          </a>
        </span>
      );
    }
    else {
      content = (
        <span className="preview play">
          <a href="#" onClick={this.play}>
            <i className="fa fa-play" />
          </a>
        </span>
      );
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          {content}
        </div>
      </nav>
    );
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