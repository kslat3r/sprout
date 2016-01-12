import React, { Component } from 'react';

export default class Artist extends Component {
  render() {
    var imgSrc = '/images/thumbnail-placeholder.png';

    if (this.props.data.images[0] && this.props.data.images[0].url) {
      imgSrc = this.props.data.images[0].url;
    }

    return (
      <div className="thumbnail">
        <img src={imgSrc} />
        <div className="caption">
          <h3>{this.props.data.name}</h3>
        </div>
      </div>
    );
  }
};