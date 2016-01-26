import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetActions from '../../../actions/set';
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
        <div className="compressor m-t-20 m-b-20 vertical-center">
          <div className="col-xs-11">
            Compressor
          </div>
          <div className="col-xs-1">
            <SetEditorCompressorControls resetCompressor={this.props.resetCompressor} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="toggle-handler" onClick={this.toggleShown}>
          Compressor
        </div>
        {compressor}
      </div>
    );
  }
}

SetEditorCompressor.propTypes = {
  filters: PropTypes.array.isRequired,
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch)
  };
})(SetEditorCompressor);