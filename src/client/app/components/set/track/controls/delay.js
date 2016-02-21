import React, { Component, PropTypes } from 'react';
import SetTrackControls from './';

class SetTrackControlsDelay extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  reset(e) {
    if (e) {
      e.preventDefault();
    }

    var newDelayState = this.props.meta.setIn(['sample', 'delay'], this.props.meta.getIn(['sample', 'defaultDelay']));

    this.props.trackActions.setDelay(this.props.track.id, newDelayState.getIn(['sample', 'delay']));
    this.props.trackActions.updateInSet(this.props.track.id, {delay: newDelayState.getIn(['sample', 'delay']).toJS()});
  }

  render() {
    return (
      <div className="controls">
        <div className="row">
          <span className="reset">
            <a href="#" onClick={this.reset}>
              <i className="fa fa-eraser" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

SetTrackControlsDelay.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default SetTrackControls(SetTrackControlsDelay);
