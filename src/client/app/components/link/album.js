import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AlbumLink extends Component {
  render() {
    return (
      <Link to={`/albums/${this.props.album.id}`}>
        {this.props.children}
      </Link>
    );
  }
};

AlbumLink.propTypes = {
  album: PropTypes.object.isRequired
};