import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SetLink extends Component {
  render() {
    return (
      <Link to={`/sets/${this.props.set._id}`}>
        {this.props.children}
      </Link>
    );
  }
};

SetLink.propTypes = {
  set: PropTypes.object.isRequired
};