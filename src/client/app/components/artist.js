import React, { Component } from 'react';

export default class Artist extends Component {
  render() {
    var url = '/artists/' + this.props.data.id;
    var imgSrc = '/images/thumbnail-placeholder.png';

    if (this.props.data.images[0] && this.props.data.images[0].url) {
      imgSrc = this.props.data.images[0].url;
    }

    return (
      <div className="thumbnail">
        <a href={url}>
          <img src={imgSrc} />
        </a>
        <div className="caption">
          <a href={url}>
            <h3>{this.props.data.name}</h3>
          </a>
        </div>
      </div>
    );
  }
};