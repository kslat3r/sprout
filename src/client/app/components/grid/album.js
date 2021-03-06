import React, { Component, PropTypes } from 'react';
import ArtistLink from '../link/artist';
import AlbumLink from '../link/album';

export default class Album extends Component {
  render() {
    var imgSrc = '/images/thumbnail-placeholder.png';

    if (this.props.data.images[this.props.data.images.length - 2] && this.props.data.images[this.props.data.images.length - 2].url) {
      imgSrc = this.props.data.images[this.props.data.images.length - 2].url;
    }

    var albumType = this.props.data.album_type.charAt(0).toUpperCase() + this.props.data.album_type.slice(1);
    albumType = <h5>{albumType}</h5>;

    return (
      <div className="thumbnail">
        <AlbumLink album={this.props.data}>
          <div className="thumbnail-image">
            <img src={imgSrc} />
          </div>
        </AlbumLink>
        <div className="caption">
          <AlbumLink album={this.props.data}>
            <h3>{this.props.data.name}</h3>
          </AlbumLink>
          <h4><ArtistLink artists={this.props.data.artists} /></h4>
          {albumType}
        </div>
      </div>
    );
  }
};

Album.propTypes = {
  data: PropTypes.object.isRequired
};