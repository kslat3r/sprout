import React, { Component } from 'react';
import SetTrackControls from './';

class SetTrackControlsDelay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      effectName: 'delay'
    };
  }

  render() {
    return false;
  }
}

export default SetTrackControls(SetTrackControlsDelay);
