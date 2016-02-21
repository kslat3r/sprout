import React, { Component, PropTypes } from 'react';
import SetTrackControls from './';

class SetTrackControlsCompressor extends Component {
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

SetTrackControlsCompressor.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default SetTrackControls(SetTrackControlsCompressor);
