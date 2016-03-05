import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';
import { initialTrackState } from '../../../../reducers/set';
import Immutable from 'immutable';

export default function(SubComponent, opts) {
  class SetTrackControls extends Component {
    render() {
      var reset;

      if (opts.hasReset === true) {
        reset = (
          <span className="reset">
            <a href="#" onClick={this.reset}>
              <i className="fa fa-eraser" />
            </a>
          </span>
        );
      }

      return (
        <div className="controls">
          <div className="row">
            {reset}
            <SubComponent {...this.props} {...this.state} />
          </div>
        </div>
      );
    }
  };

  SetTrackControls.propTypes = {
    track: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
  };

  return connect(function(state) {
    return {
      initialTrackState: initialTrackState
    };
  }, function(dispatch) {
    return {
      trackActions: bindActionCreators(TrackActions, dispatch)
    };
  }, function(stateProps, dispatchProps, ownProps) {
    return Object.assign(stateProps, dispatchProps, ownProps);
  })(SetTrackControls);
};
