import React, { Component, PropTypes } from 'react';

export default class SetEditorEQControls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="row">
          <span className="reset">
            <a href="#" onClick={this.props.resetEQ}>
              <i className="fa fa-eraser" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

SetEditorEQControls.propTypes = {
  resetEQ: PropTypes.func.isRequired
};