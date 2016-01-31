import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import Switch from 'react-bootstrap-switch';
import SetEditorEffectControls from './effectControls';

class SetEditorEffect extends Component {
  constructor(props) {
    super(props);

    this.onBypassToggle = this.onBypassToggle.bind(this);
    this.onParamChange = this.onParamChange.bind(this);

    this.state = {
      updateTimeout: null
    };
  }

  onBypassToggle(e) {
    this.props.meta.effects[this.props.effect].bypass = !this.props.meta.effects[this.props.effect].bypass;

    this.props.trackActions.setEffects(this.props.track.id, this.props.meta.effects);
    this.props.trackActions.updateInSet(this.props.track.id, {effects: this.props.meta.effects});
  }

  onParamChange(key, e) {
    if (e.target && e.target.value) {
      this.props.meta.effects[this.props.effect][key] = e.target.value;
    }
    else {
      this.props.meta.effects[this.props.effect][key] = e;
    }

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {effects: this.props.meta.effects}]), 500);
    this.props.trackActions.setEffects(this.props.track.id, this.props.meta.effects);

    this.forceUpdate();
  }

  render() {
    var effect;

    var keys = _.difference(Object.keys(this.props.effects.default[this.props.effect]), ['bypass']);
    var colSize = Math.ceil(11 / keys.length);
    var colClassName = 'col-xs-' + colSize;

    if (!this.props.meta.effects[this.props.effect].bypass) {
      effect = (
        <div className="row vertical-center m-t-20">
          <div className="col-xs-11 effect-params">
            {keys.map((key, i) => {
              var className = colClassName + ' effect-param ' + this.props.effect + '-param ' + key;
              var elem;

              if (this.props.effects.uiType[this.props.effect][key] === 'range') {
                var min = this.props.effects.min[this.props.effect][key];
                var max = this.props.effects.max[this.props.effect][key];
                var step = this.props.effects.step[this.props.effect][key];

                elem = (
                  <div>
                    <input type="range" min={min} max={max} step={step} value={this.props.meta.effects[this.props.effect][key]} title={_.capitalize(key)} orient="vertical" onChange={this.onParamChange.bind(this, key)} />
                    <span>{this.props.meta.effects[this.props.effect][key]}</span>
                  </div>
                );
              }
              else if (this.props.effects.uiType[this.props.effect][key] === 'toggle') {
                elem = (
                  <Switch state={this.props.meta.effects[this.props.effect][key]} size="mini" onText="On" offText="Off" onColor="success" offColor="danger" onChange={this.onParamChange.bind(this, key)} />
                );
              }
              else if (this.props.effects.uiType[this.props.effect][key] === 'select') {
                elem = (
                  <select value={this.props.meta.effects[this.props.effect][key]} onChange={this.onParamChange.bind(this, key)}>
                    {this.props.effects.selectValues[this.props.effect][key].map((value, i) => {
                      return (
                        <option value={value} key={i}>{value.toString().replace('.wav', '')}</option>
                      );
                    })}
                  </select>
                );
              }

              return (
                <div className={className} key={i}>
                  <span className="title">{_.startCase(key)}</span>
                  {elem}
                </div>
              );
            }.bind(this))}
          </div>
          <div className="col-xs-1">
            <SetEditorEffectControls effect={this.props.effect} track={this.props.track} meta={this.props.meta} />
          </div>
        </div>
      );
    }

    var className = 'effect ' + this.props.effect;

    return (
      <div className={className}>
        <div className="toggle-handler">
          {_.capitalize(this.props.effect)}
          <Switch state={!this.props.meta.effects[this.props.effect].bypass} size="mini" onText="On" offText="Bypass" onColor="success" offColor="danger" onChange={this.onBypassToggle} />
        </div>
        {effect}
      </div>
    );
  }
}

SetEditorEffect.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  effect: PropTypes.string.isRequired
};

export default connect(function(state) {
  return {
    effects: state.effects
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetEditorEffect);
