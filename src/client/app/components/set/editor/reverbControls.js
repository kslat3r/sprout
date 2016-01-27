import React, { Component, PropTypes } from 'react';

export default class SetEditorReverbControls extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  reset() {

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

SetEditorReverbControls.propTypes = {
};