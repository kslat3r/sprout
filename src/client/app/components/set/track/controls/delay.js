import React, { Component } from 'react';
import SetTrackControls from './';

class SetTrackControlsDelay extends Component {
  render() {
    return false;
  }
}

export default SetTrackControls(SetTrackControlsDelay, {
  effectName: 'delay',
  hasReset: true
});
