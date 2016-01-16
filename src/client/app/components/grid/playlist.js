import React, { Component, PropTypes } from 'react';
import PlaylistLink from '../link/playlist';

export default class Playlist extends Component {
  render() {
    var imgSrc = '/images/thumbnail-placeholder.png';

    if (this.props.data.images[this.props.data.images.length - 2] && this.props.data.images[this.props.data.images.length - 2].url) {
      imgSrc = this.props.data.images[this.props.data.images.length - 2].url;
    }

    return (
      <div className="thumbnail">
        <PlaylistLink playlist={this.props.data}>
          <div className="thumbnail-image">
            <img src={imgSrc} />
          </div>
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