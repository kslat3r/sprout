import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class SetEditorSamplerControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeModalShown: false
    };

    this.showRemoveModal = this.showRemoveModal.bind(this);
    this.hideRemoveModal = this.hideRemoveModal.bind(this);
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

  remove() {
    this.props.remove();

    this.setState({
      removeModalShown: false
    });
  }

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
            <i className="fa fa-repeat" />
          </a>
        </span>
      );
    }
    else {
      loopOrEnd = (
        <span className="loop">
          <a href="#" onClick={this.props.toggleLoop}>
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
        </div>
        <div className="row">
          {loopOrEnd}
          <span className="clear">
            <a href="#" onClick={this.props.clear}>
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