import React, { Component } from 'react';
import Preview from './player/preview';

export default class Track extends Component {
  render() {
    return (
      <div>
        {this.props.data.name}
        <Preview track={this.props.data} />
      </div>
    );
  }
};