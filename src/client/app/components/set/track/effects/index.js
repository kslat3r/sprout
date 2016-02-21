import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';

export default function(SubComponent) {
  class SetTrackEffects extends Component {
    render() {
      return (
        <SubComponent {...this.props} />
      );
    }
  };

  return connect(function(state) {
    return {
    };
  }, function(dispatch) {
    return {
      trackActions: bindActionCreators(TrackActions, dispatch)
    };
  }, function(stateProps, dispatchProps, ownProps) {
    return Object.assign(stateProps, dispatchProps, ownProps);
  })(SetTrackEffects);
};
