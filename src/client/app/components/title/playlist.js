import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PlaylistLink from '../link/playlist';

export default class Playlist extends Component {
  render() {
    var imgSrc = '/images/thumbnail-placeholder.png';

    if (this.props.data.images[0] && this.props.data.images[0].url) {
      imgSrc = this.props.data.images[0].url;
    }

    return (
      <div className="thumbnail">
        <PlaylistLink playlist={this.props.data}>
          <img src={imgSrc} />
        </PlaylistLink>
        <div className="caption">
          <PlaylistLink playlist={this.props.data}>
            <h3>{this.props.data.name}</h3>
          </PlaylistLink>
        </div>
      </div>
    );
  }
};

Playlist.propTypes = {
  data: PropTypes.object.isRequired
};