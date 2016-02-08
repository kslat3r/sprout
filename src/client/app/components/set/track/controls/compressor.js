import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';

class SetTrackCompressorControls extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  reset(e) {
    if (e) {
      e.preventDefault();
    }

    var newCompressorState = this.props.meta.setIn(['sample', 'compressor'], this.props.meta.getIn(['sample', 'defaultCompressor']));

    this.props.trackActions.setCompressor(this.props.track.id, newCompressorState.getIn(['sample', 'compressor']));
    this.props.trackActions.updateInSet(this.props.track.id, {compressor: newCompressorState.getIn(['sample', 'compressor']).toJS()});
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

SetTrackCompressorControls.propTypes = {
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
})(SetTrackCompressorControls);
