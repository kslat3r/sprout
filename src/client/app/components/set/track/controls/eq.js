import React, { Component } from 'react';
import SetTrackControls from './';

class SetTrackControlsEQ extends Component {
  render() {
    return null;
  }
}

export default SetTrackControls(SetTrackControlsEQ, {
  effectName: 'EQ',
  hasReset: true
});
