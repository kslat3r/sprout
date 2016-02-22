import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetTrackControlsEQ from '../controls/eq';
import SetTrackEffects from './';

class SetTrackEffectsEQ extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    var eq = false;

    if (!this.props.meta.getIn(['sample', 'eq', 'bypass'])) {
      eq = (
        <div className="m-t-20 m-b-20">
          <div className="row vertical-center">
            <div className="col-xs-11">
              {this.props.meta.getIn(['sample', 'eq', 'filters']).toArray().map((filter, i) => {
                return (
                  <div className="col-xs-1 filter" key={i}>
                    <span>{filter.get('frequency')}</span>
                    <input type="range" min="-40" max="40" value={filter.get('gain')} title={filter.get('frequency')} orient="vertical" onChange={this.props.onParamChange.bind(this, 'filters', i, 'gain')} />
                    <span>{filter.get('gain')}</span>
                  </div>
                );
              }.bind(this))}
            </div>
            <div className="col-xs-1">
              <SetTrackControlsEQ track={this.props.track} meta={this.props.meta} />
            </div>
          </div>
        </div>
      );
    }

    return eq;
  }
}

SetTrackEffectsEQ.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onParamChange: PropTypes.func.isRequired
};

export default SetTrackEffects(SetTrackEffectsEQ, {
  effectName: 'EQ',
  hasBypass: true
});
