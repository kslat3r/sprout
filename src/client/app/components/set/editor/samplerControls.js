import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import { Modal, Button } from 'react-bootstrap';

class SetEditorSamplerControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeModalShown: false
    };

    this.showRemoveModal = this.showRemoveModal.bind(this);
    this.hideRemoveModal = this.hideRemoveModal.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.rewind = this.rewind.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.clear = this.clear.bind(this);
    this.remove = this.remove.bind(this);
  }

  showRemoveModal() {
    this.setState({
      removeModalShown: true
    });
  }

  hideRemoveModal() {
    this.setState({
      removeModalShown: false
    });
  }

  play() {
    this.props.trackActions.play(this.props.track.id);
  }

  pause() {
    this.props.trackActions.pause(this.props.track.id);
  }

  stop() {
    this.props.trackActions.stop(this.props.track.id);
  }

  rewind() {
    var shouldPlay = this.props.meta.isPlaying;

    this.stop();

    if (shouldPlay) {
      setTimeout(() => {
        this.props.trackActions.play(this.props.track.id);
      }.bind(this), 5);
    }
  }

  toggleLoop() {
    this.props.trackActions.updateInSet(this.props.track.id, {
      loop: !this.props.meta.isLooped
    });

    this.props.trackActions.toggleLoop(this.props.track.id);
  }

  clear() {
    this.props.trackActions.updateInSet(this.props.track.id, {
      startPosition: null,
      endPosition: null
    });

    this.props.trackActions.clearRegion(this.props.track.id);
  }

  remove() {
    this.props.trackActions.deleteFromSet(this.props.track.id);

    this.setState({
      removeModalShown: false
    });
  }

  render() {
    var pauseOrPlay;
    var loopOrEnd;

    if (this.props.meta.isPlaying) {
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

    if (this.props.meta.isLooped) {
      loopOrEnd = (
        <span className="loop">
          <a href="#" onClick={this.toggleLoop}>
            <i className="fa fa-repeat" />
          </a>
        </span>
      );
    }
    else {
      loopOrEnd = (
        <span className="loop">
          <a href="#" onClick={this.toggleLoop}>
            <i className="fa fa-long-arrow-right" />
          </a>
        </span>
      );
    }

    return (
      <div className="controls">
        <Modal show={this.state.removeModalShown} onHide={this.hideRemoveModal}>
          <Modal.Header>
            <Modal.Title>Are you sure you want to delete this track from the set?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.hideRemoveModal}>Close</Button>
            <Button onClick={this.remove} bsStyle="danger">OK</Button>
          </Modal.Footer>
        </Modal>
        <div className="row">
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
        </div>
        <div className="row">
          {loopOrEnd}
          <span className="clear">
            <a href="#" onClick={this.clear}>
              <i className="fa fa-eraser" />
            </a>
          </span>
          <span className="clear">
            <a href="#" onClick={this.showRemoveModal}>
              <i className="fa fa-trash" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

SetEditorSamplerControls.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetEditorSamplerControls);