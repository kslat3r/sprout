import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetTrackEffects from './';

class SetTrackEffectsVolume extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="volume">
        <span>Volume</span>
        <input type="range" min="0" max="100" value={this.props.meta.getIn(['sample', 'volume'])} title="Volume" orient="horizontal" onChange={this.props.onParamChange.bind(this)} />
        <span>{this.props.meta.getIn(['sample', 'volume'])}</span>
      </div>
    );
  }
}

SetTrackEffectsVolume.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onParamChange: PropTypes.func.isRequired
};

export default SetTrackEffects(SetTrackEffectsVolume, {
  effectName: 'volume',
  hasBypass: false
});
