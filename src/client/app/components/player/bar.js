import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as PlayerActions from '../../actions/player';

class PlayerBar extends Component {
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
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <span className="preview play">
          <a href="#" onClick={this.play}>
            <i className="fa fa-play" />
          </a>
        </span>
      </nav>
    );
  }
};

PlayerBar.propTypes = {};

export default connect(function(state) {
  return {
    player: state.player
  };
}, PlayerActions)(PlayerBar);