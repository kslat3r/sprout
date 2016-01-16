import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PlaylistLink extends Component {
  render() {
    return (
      <Link to={`/playlists/${this.props.playlist.id}`}>
        {this.props.children}
      </Link>
    );
  }
};

PlaylistLink.propTypes = {
  playlist: PropTypes.object.isRequired
};