import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetEditorCompressorControls from './compressorControls';

class SetEditorCompressor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false
    };

    this.toggleShown = this.toggleShown.bind(this);
  }

  toggleShown() {
    this.setState({
      shown: !this.state.shown
    });
  }

  render() {
    var compressor;

    if (this.state.shown) {
      compressor = (
        <div className="row vertical-center m-t-20 m-b-20">
          <div className="col-xs-11">
            Compressor
          </div>
          <div className="col-xs-1">
            <SetEditorCompressorControls track={this.props.track} meta={this.props.meta} />
          </div>
        </div>
      );
    }

    return (
      <div className="compressor">
        <div className="toggle-handler" onClick={this.toggleShown}>
          Compressor
        </div>
        {compressor}
      </div>
    );
  }
}

SetEditorCompressor.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
  };
})(SetEditorCompressor);