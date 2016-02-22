import React, { Component } from 'react';
import SetTrackControls from './';

class SetTrackControlsCompressor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      effectName: 'compressor'
    };
  }

  render() {
    return false;
  }
}

export default SetTrackControls(SetTrackControlsCompressor);
