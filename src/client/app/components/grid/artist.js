import React, { Component, PropTypes } from 'react';
import ArtistLink from '../link/artist';

export default class Artist extends Component {
  render() {
    var imageSrc = '/images/thumbnail-placeholder.png';

    if (this.props.data.images[this.props.data.images.length - 2] && this.props.data.images[this.props.data.images.length - 2].url) {
      imageSrc = this.props.data.images[this.props.data.images.length - 2].url;
    }

    return (
      <div className="thumbnail">
        <ArtistLink artist={this.props.data}>
          <div className="thumbnail-image">
            <img src={imageSrc} />
          </div>
        </ArtistLink>
        <div className="caption">
          <ArtistLink artist={this.props.data}>
            <h3>{this.props.data.name}</h3>
          </ArtistLink>
        </div>
      </div>
    );
  }
};

Artist.propTypes = {
  data: PropTypes.object.isRequired
};