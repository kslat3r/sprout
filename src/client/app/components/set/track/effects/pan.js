import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetTrackEffects from './';

class SetTrackEffectsPan extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="pan">
        <span>Pan</span>
        <input type="range" min="-45" max="45" value={this.props.meta.getIn(['sample', 'pan'])} title="Pan" orient="horizontal" onChange={this.props.onParamChange.bind(this)} />
        <span>{((this.props.meta.getIn(['sample', 'pan']) / 45 ) * 100).toPrecision(3)}</span>
      </div>
    );
  }
}

SetTrackEffectsPan.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onParamChange: PropTypes.func.isRequired
};

export default SetTrackEffects(SetTrackEffectsPan, {
  effectName: 'pan',
  hasBypass: false
});
