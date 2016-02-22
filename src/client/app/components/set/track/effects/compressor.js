import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetTrackControlsCompressor from '../controls/compressor';
import SetTrackEffects from './';

class SetTrackEffectsCompressor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: {
        threshold: -100,
        knee: 0,
        ratio: 1,
        attack: 0,
        release: 0
      },
      max: {
        threshold: -0,
        knee: 40,
        ratio: 20,
        attack: 1,
        release: 1
      },
      step: {
        threshold: 1,
        knee: 1,
        ratio: 1,
        attack: 0.001,
        release: 0.001
      }
    };
  }

  render() {
    var compressor = false;

    if (!this.props.meta.getIn(['sample', 'compressor', 'bypass'])) {
      compressor = (
        <div className="m-t-20 m-b-20">
          <div className="row vertical-center">
            <div className="col-xs-11">
              {['threshold', 'knee', 'ratio', 'attack', 'release'].map((key, i) => {
                return (
                  <div className="col-xs-2 param" key={i}>
                    <span>{_.capitalize(key)}</span>
                    <input type="range" min={this.state.min[key]} max={this.state.max[key]} step={this.state.step[key]} value={this.props.meta.getIn(['sample', 'compressor', key])} title={_.capitalize(key)} orient="vertical" onChange={this.props.onParamChange.bind(this, key)} />
                    <span>{this.props.meta.getIn(['sample', 'compressor', key])}</span>
                  </div>
                );
              }.bind(this))}
            </div>
            <div className="col-xs-1">
              <SetTrackControlsCompressor track={this.props.track} meta={this.props.meta} />
            </div>
          </div>
        </div>
      );
    }

    return compressor;
  }
}

SetTrackEffectsCompressor.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onParamChange: PropTypes.func.isRequired
};

export default SetTrackEffects(SetTrackEffectsCompressor, {
  effectName: 'compressor',
  hasBypass: true
});
