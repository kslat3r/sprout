import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SetLink extends Component {
  render() {
    var id = this.props.set.get('_id');

    return (
      <Link to={`/sets/${id}`}>
        {this.props.children}
      </Link>
    );
  }
};

SetLink.propTypes = {
  set: PropTypes.object.isRequired
};
