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

    onBypassToggle() {
      var effectName = opts.effectName.toLowerCase();      
      var newState = this.props.meta.setIn(['sample', effectName, 'bypass'], !this.props.meta.getIn(['sample', effectName, 'bypass']));

      this.props.trackActions.updateInSet(this.props.track.id, {
        [effectName]: newState.getIn(['sample', effectName]).toJS()
      });
      this.props.trackActions['set' + (effectName === 'eq' ? 'EQ' : _.capitalize(effectName))](this.props.track.id, newState.getIn(['sample', effectName]));
    }

    render() {
      if (opts.hasBypass) {
        var className = opts.effectName.toLowerCase() + ' effect';

        return (
          <div className={className}>
            <div className="bypass-toggle">
              <span>{_.capitalize(opts.effectName)}</span>
              <Switch state={!this.props.meta.getIn(['sample', opts.effectName.toLowerCase(), 'bypass'])} size="mini" onText="On" offText="Bypass" onChange={this.onBypassToggle} onColor="success" offColor="danger" />
            </div>
            <SubComponent {...this.props} {...this.state} />
          </div>
        );
      }

      return (
        <SubComponent {...this.props} {...this.state} />
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
