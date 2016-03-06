import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SetTrackLink extends Component {
  render() {
    return (
      <Link to={`/sets/${this.props.set.result._id}/${this.props.track.id}`}>
        {this.props.children}
      </Link>
    );
  }
};

SetTrackLink.propTypes = {
  set: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired
};
