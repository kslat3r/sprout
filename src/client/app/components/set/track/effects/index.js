import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';
import Switch from 'react-bootstrap-switch';

export default function(SubComponent, opts) {
  class SetTrackEffects extends Component {
    constructor(props) {
      super(props);

      this.onBypassToggle = this.onBypassToggle.bind(this);
    }

    onBypassToggle(val, e) {
      if (!e) {
        return;
      }

      var effectName = opts.effectName.toLowerCase();
      var newState = this.props.meta.setIn(['sample', effectName, 'bypass'], !this.props.meta.getIn(['sample', effectName, 'bypass']));

      this.props.trackActions.updateInSet(this.props.track.id, {
        [effectName]: newState.getIn(['sample', effectName]).toJS()
      });

      this.props.trackActions['set' + (effectName === 'eq' ? 'EQ' : _.capitalize(effectName))](this.props.track.id, newState.getIn(['sample', effectName]));
    }

    onParamChange() {
      var effectName = opts.effectName.toLowerCase();
      var newState;

      //state

      var e = arguments[arguments.length - 1];
      var args = Array.prototype.slice.call(arguments).slice(0, -1);

      var path = ['sample', effectName].concat(args);
      var newState = this.props.meta.setIn(path, e.target.value)

      //value

      var effectValue = newState.getIn(['sample', effectName]);

      if (effectValue.toJS !== undefined) {
        effectValue = effectValue.toJS();
      }

      //timer

      if (this.state.updateTimeout) {
        clearInterval(this.state.updateTimeout);
      }

      this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {
        [effectName]: effectValue
      }]), 500);

      //set

      this.props.trackActions['set' + _.capitalize(opts.effectName)](this.props.track.id, newState.getIn(['sample', effectName]));
    }

    render() {
      if (opts.hasBypass) {
        var className = opts.effectName.toLowerCase() + ' effect';
        var bypass = this.props.meta.getIn(['sample', opts.effectName.toLowerCase(), 'bypass']);

        return (
          <div className={className}>
            <div className="bypass-toggle">
              <span>{_.capitalize(opts.effectName)}</span>
              <Switch state={!bypass} size="mini" onText="On" offText="Bypass" onChange={this.onBypassToggle} onColor="success" offColor="danger" />
            </div>
            <SubComponent {...this.props} {...this.state} onParamChange={this.onParamChange} />
          </div>
        );
      }

      return (
        <SubComponent {...this.props} {...this.state} onParamChange={this.onParamChange} />
      );
    }
  };

  return connect(function(state) {
    return {
    };
  }, function(dispatch) {
    return {
      trackActions: bindActionCreators(TrackActions, dispatch)
    };
  }, function(stateProps, dispatchProps, ownProps) {
    return Object.assign(stateProps, dispatchProps, ownProps);
  })(SetTrackEffects);
};
