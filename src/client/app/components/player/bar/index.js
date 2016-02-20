import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../../../actions/player';
import Waveform from './waveform';
import Add from '../../set/add';
import ArtistLink from '../../link/artist';

class PlayerBar extends Component {
  constructor() {
    this.rewind = this.rewind.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  rewind(e) {
    e.preventDefault();

    this.props.playerActions.rewind();
  }

  pause(e) {
    e.preventDefault();

    this.props.playerActions.pause();
  }

  play(e) {
    e.preventDefault();

    this.props.playerActions.play(this.props.player.get('track'));
  }

  stop(e) {
    e.preventDefault();

    this.props.playerActions.stop();
  }

  render() {
    var pauseOrPlay;

    if (this.props.player.get('isPlaying')) {
      pauseOrPlay = (
        <span className="pause">
          <a href="#" onClick={this.pause}>
            <i className="fa fa-pause" />
          </a>
        </span>
      );
    }
    else {
      pauseOrPlay = (
        <span className="play">
          <a href="#" onClick={this.play}>
            <i className="fa fa-play" />
          </a>
        </span>
      );
    }

    if (this.props.player.get('track').size) {
      return (
        <nav className="navbar navbar-default navbar-fixed-bottom playbar">
          <div className="container-fluid">
            <Waveform track={this.props.player.get('track').toJS()} meta={this.props.player.get('meta')} />
            <div className="track-info">
              <span>
                {this.props.player.getIn(['track', 'name'])}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <ArtistLink artists={this.props.player.getIn(['track', 'artists']).toJS()} />
            </div>
            <div className="controls">
              <span className="rewind">
                <a href="#" onClick={this.rewind}>
                  <i className="fa fa-backward" />
                </a>
              </span>
              {pauseOrPlay}
              <span className="stop">
                <a href="#" onClick={this.stop}>
                  <i className="fa fa-stop" />
                </a>
              </span>
              <Add track={this.props.player.get('track').toJS()} context="bar" />
            </div>
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
    player: state.get('player'),
  };
}, function(dispatch) {
  return {
    playerActions: bindActionCreators(PlayerActions, dispatch)
  };
})(PlayerBar);
