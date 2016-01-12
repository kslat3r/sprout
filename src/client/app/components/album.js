import React, { Component } from 'react';

export default class Album extends Component {
  render() {
    var url = "/album/" + this.props.data.id;
    var imgSrc = '/images/thumbnail-placeholder.png';

    if (this.props.data.images[0] && this.props.data.images[0].url) {
      imgSrc = this.props.data.images[0].url;
    }

    var artists = '';

    this.props.data.artists.forEach(function(artist, i) {
      artists += artist.name + ', ';
    });

    artists = artists.replace(/,\s$/, '');

    return (
      <div className="thumbnail">
        <a href={url}>
          <img src={imgSrc} />
        </a>
        <div className="caption">
          <a href={url}>
            <h3>{this.props.data.name}</h3>
          </a>
          <h4>{artists}</h4>
        </div>
      </div>
    );
  }
};