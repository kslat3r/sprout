import React, { Component, PropTypes } from 'react';

export default class SetEditorSamplerControls extends Component {
  render() {
    var pauseOrPlay;
    var loopOrEnd;

    if (this.props.isPlaying) {
      pauseOrPlay = (
        <span className="pause">
          <a href="#" onClick={this.props.pause}>
            <i className="fa fa-pause" />
          </a>
        </span>
      );
    }
    else {
      pauseOrPlay = (
        <span className="play">
          <a href="#" onClick={this.props.play}>
            <i className="fa fa-play" />
          </a>
        </span>
      );
    }

    if (this.props.isLooped) {
      loopOrEnd = (
        <span className="loop">
          <a href="#" onClick={this.props.toggleLoop}>
            <i className="fa fa-long-arrow-right" />
          </a>
        </span>
      );
    }
    else {
      loopOrEnd = (
        <span className="loop">
          <a href="#" onClick={this.props.toggleLoop}>
            <i className="fa fa-repeat" />
          </a>
        </span>
      );
    }

    return (
      <div className="sampler-controls">
        <span className="rewind">
          <a href="#" onClick={this.props.rewind}>
            <i className="fa fa-backward" />
          </a>
        </span>
        {pauseOrPlay}
        <span className="stop">
          <a href="#" onClick={this.props.stop}>
            <i className="fa fa-stop" />
          </a>
        </span>
        {loopOrEnd}
        <span className="clear">
          <a href="#" onClick={this.props.clear}>
            <i className="fa fa-eraser" />
          </a>
        </span>
        <span className="clear">
          <a href="#" onClick={this.props.remove}>
            <i className="fa fa-trash" />
          </a>
        </span>
      </div>
    );
  }
}

SetEditorSamplerControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isLooped: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  rewind: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  toggleLoop: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};