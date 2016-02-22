import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetTrackControlsDelay from '../controls/delay';
import SetTrackEffects from './';

class SetTrackEffectsDelay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: {
        delayTime: 0
      },
      max: {
        delayTime: 60
      },
      step: {
        delayTime: 0.1
      }
    };
  }

  render() {
    var delay = false;

    if (!this.props.meta.getIn(['sample', 'delay', 'bypass'])) {
      delay = (
        <div className="m-t-20 m-b-20">
          <div className="row vertical-center">
            <div className="col-xs-11">
              {['delayTime'].map((key, i) => {
                return (
                  <div className="col-xs-11 param" key={i}>
                    <span>{_.capitalize(_.startCase(key))}</span>
                    <input type="range" min={this.state.min[key]} max={this.state.max[key]} step={this.state.step[key]} value={this.props.meta.getIn(['sample', 'delay', key])} title={_.capitalize(key)} orient="vertical" onChange={this.props.onParamChange.bind(this, key)} />
                    <span>{this.props.meta.getIn(['sample', 'delay', key])}</span>
                  </div>
                );
              }.bind(this))}
            </div>
            <div className="col-xs-1">
              <SetTrackControlsDelay track={this.props.track} meta={this.props.meta} />
            </div>
          </div>
        </div>
      );
    }

    return delay;
  }
}

SetTrackEffectsDelay.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onParamChange: PropTypes.func.isRequired
};

export default SetTrackEffects(SetTrackEffectsDelay, {
  effectName: 'delay',
  hasBypass: true
});
