import React, { Component, PropTypes } from 'react';

export default class SetEditorCompressorControls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="row">
          <span className="reset">
            <a href="#" onClick={this.props.resetCompressor}>
              <i className="fa fa-eraser" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

SetEditorCompressorControls.propTypes = {
  resetCompressor: PropTypes.func.isRequired
};