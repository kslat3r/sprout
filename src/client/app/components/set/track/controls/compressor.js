import React, { Component } from 'react';
import SetTrackControls from './';

class SetTrackControlsCompressor extends Component {
  render() {
    return null;
  }
}

export default SetTrackControls(SetTrackControlsCompressor, {
  effectName: 'compressor',
  hasReset: true
});
