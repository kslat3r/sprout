import React, { Component } from 'react';

export default class Album extends Component {
  render() {
    return (
      <div className="thumbnail">
        <img src={this.props.data.images[0].url} />
        <div className="caption">
          <h3>{this.props.data.name}</h3>
        </div>
      </div>
    );
  }
};