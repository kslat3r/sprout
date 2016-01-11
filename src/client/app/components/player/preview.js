import React, { Component, PropTypes } from 'react';

export default class Preview extends Component {
  constructor() {
    this.preview = this.preview.bind(this);
  }

  preview(e) {
    e.preventDefault();
  }

  render() {
    return (
      <span>
        &nbsp;<a href="#" onClick={this.preview}>
          <i className="fa fa-play-circle" />
        </a>
      </span>
    );
  }
};

Preview.propTypes = {
  item: PropTypes.object.isRequired
};