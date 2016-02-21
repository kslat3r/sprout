import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetTrackEffects from './';

class SetTrackEffectsVolume extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateTimeout: null
    };

    this.onVolumeChange = this.onVolumeChange.bind(this);
  }

  onVolumeChange(e) {
    var newVolumeState = this.props.meta.setIn(['sample', 'volume'], e.target.value)

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {volume: newVolumeState.getIn(['sample', 'volume'])}]), 500);
    this.props.trackActions.setVolume(this.props.track.id, newVolumeState.getIn(['sample', 'volume']));
  }

  render() {
    return (
      <div className="volume">
        <span>Volume</span>
        <input type="range" min="0" max="100" value={this.props.meta.getIn(['sample', 'volume'])} title="Volume" orient="horizontal" onChange={this.onVolumeChange} />
        <span>{this.props.meta.getIn(['sample', 'volume'])}</span>
      </div>
    );
  }
}

SetTrackEffectsVolume.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default SetTrackEffects(SetTrackEffectsVolume);
