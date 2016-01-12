import React, { Component, PropTypes } from 'react';

export default class Add extends Component {
  render() {
    return (
      <span>
        <a href="#">
          <i className="fa fa-plus" />
        </a>
      </span>
    );
  }
};

Add.propTypes = {
  track: PropTypes.object.isRequired
};