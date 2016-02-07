import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';

class SetTrackEQControls extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  reset() {
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

SetTrackEQControls.propTypes = {
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
})(SetTrackEQControls);
