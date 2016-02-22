import React, { Component } from 'react';
import SetTrackControls from './';

class SetTrackControlsEQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      effectName: 'EQ'
    };
  }

  render() {
    return false;
  }
}

export default SetTrackControls(SetTrackControlsEQ);
