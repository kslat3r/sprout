import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetTrackEffects from './';

class SetTrackEffectsPan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateTimeout: null
    };

    this.onPanChange = this.onPanChange.bind(this);
  }

  onPanChange(e) {
    var newPanState = this.props.meta.setIn(['sample', 'pan'], e.target.value)

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {pan: newPanState.getIn(['sample', 'pan'])}]), 500);
    this.props.trackActions.setPan(this.props.track.id, newPanState.getIn(['sample', 'pan']));
  }

  render() {
    return (
      <div className="pan">
        <span>Pan</span>
        <input type="range" min="-45" max="45" value={this.props.meta.getIn(['sample', 'pan'])} title="Pan" orient="horizontal" onChange={this.onPanChange} />
        <span>{((this.props.meta.getIn(['sample', 'pan']) / 45 ) * 100).toPrecision(3)}</span>
      </div>
    );
  }
}

SetTrackEffectsPan.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default SetTrackEffects(SetTrackEffectsPan, {
  effectName: 'pan',
  hasBypass: false
});
