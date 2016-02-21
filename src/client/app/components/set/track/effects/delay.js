import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';
import SetTrackDelayControls from '../controls/delay';
import Switch from 'react-bootstrap-switch';

class SetTrackEffectDelay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateTimeout: null,
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

    this.onBypassToggle = this.onBypassToggle.bind(this);
  }

  onParamChange(param, e) {
    var newDelayState = this.props.meta.setIn(['sample', 'delay', param], e.target.value)

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {delay: newDelayState.getIn(['sample', 'delay']).toJS()}]), 500);
    this.props.trackActions.setDelay(this.props.track.id, newDelayState.getIn(['sample', 'delay']));
  }

  onBypassToggle() {
    var newDelayState = this.props.meta.setIn(['sample', 'delay', 'bypass'], !this.props.meta.getIn(['sample', 'delay', 'bypass']));

    this.props.trackActions.updateInSet(this.props.track.id, {delay: newDelayState.getIn(['sample', 'delay']).toJS()});
    this.props.trackActions.setDelay(this.props.track.id, newDelayState.getIn(['sample', 'delay']));
  }

  render() {
    var delay;

    if (!this.props.meta.getIn(['sample', 'delay', 'bypass'])) {
      delay = (
        <div className="m-t-20 m-b-20">
          <div className="row vertical-center">
            <div className="col-xs-11">
              {['delayTime'].map((key, i) => {
                return (
                  <div className="col-xs-11 param" key={i}>
                    <span>{_.capitalize(_.startCase(key))}</span>
                    <input type="range" min={this.state.min[key]} max={this.state.max[key]} step={this.state.step[key]} value={this.props.meta.getIn(['sample', 'delay', key])} title={_.capitalize(key)} orient="vertical" onChange={this.onParamChange.bind(this, key)} />
                    <span>{this.props.meta.getIn(['sample', 'delay', key])}</span>
                  </div>
                );
              }.bind(this))}
            </div>
            <div className="col-xs-1">
              <SetTrackDelayControls track={this.props.track} meta={this.props.meta} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="delay effect">
        <div className="bypass-toggle">
          <span>Delay</span>
          <Switch state={!this.props.meta.getIn(['sample', 'delay', 'bypass'])} size="mini" onText="On" offText="Bypass" onChange={this.onBypassToggle} onColor="success" offColor="danger" />
        </div>
        {delay}
      </div>
    );
  }
}

SetTrackEffectDelay.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetTrackEffectDelay);
