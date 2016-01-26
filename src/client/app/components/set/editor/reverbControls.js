import React, { Component, PropTypes } from 'react';

export default class SetEditorReverbControls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="row">
          <span className="reset">
            <a href="#" onClick={this.props.resetReverb}>
              <i className="fa fa-eraser" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

SetEditorReverbControls.propTypes = {
  resetReverb: PropTypes.func.isRequired
};