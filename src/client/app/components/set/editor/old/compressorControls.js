import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';

export default class SetEditorCompressorControls extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  reset() {
    var compressor = {};

    ['threshold', 'knee', 'ratio', 'attack', 'release'].forEach((key) => {
      compressor[key] = this.props.meta.compressor[key].defaultValue;
      this.props.meta.compressor[key].value = this.props.meta.compressor[key].defaultValue;
    }.bind(this));

    this.props.trackActions.updateInSet(this.props.track.id, {compressor});
    this.props.trackActions.setCompressor(this.props.track.id, this.props.meta.compressor);
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

SetEditorCompressorControls.propTypes = {
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
})(SetEditorCompressorControls);