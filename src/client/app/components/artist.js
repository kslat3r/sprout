import React, { Component } from 'react';

export default class Artist extends Component {
  render() {
    var imgSrc;

    if (this.props.data.images[0]) {
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