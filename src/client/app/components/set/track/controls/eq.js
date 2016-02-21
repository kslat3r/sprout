import React, { Component, PropTypes } from 'react';
import SetTrackControls from './';

class SetTrackControlsEQ extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  reset(e) {
    if (e) {
      e.preventDefault();
    }

    var newEQState = this.props.meta.setIn(['sample', 'eq'], this.props.meta.getIn(['sample', 'defaultEQ']));

    this.props.trackActions.setEQ(this.props.track.id, newEQState.getIn(['sample', 'eq']));
    this.props.trackActions.updateInSet(this.props.track.id, {eq: newEQState.getIn(['sample', 'eq']).toJS()});
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

SetTrackControlsEQ.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default SetTrackControls(SetTrackControlsEQ);
