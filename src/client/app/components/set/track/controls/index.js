import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';
import { initialTrackState } from '../../../../reducers/set';
import Immutable from 'immutable';

export default function(SubComponent) {
  class SetTrackControls extends Component {
    constructor(props) {
      super(props);

      this.reset = this.reset.bind(this);
    }

    reset(e) {
      if (e) {
        e.preventDefault();
      }

      var effect = this.refs.subComponent.state.effectName;
      var defaultState = Immutable.fromJS(this.props.initialTrackState.sample['default' + _.capitalize(effect)]).merge({
        bypass: false
      });
      var newState = this.props.meta.setIn(['sample', effect.toLowerCase()], defaultState);

      this.props.trackActions['set' + _.capitalize(effect)](this.props.track.id, newState.getIn(['sample', effect.toLowerCase()]));
      this.props.trackActions.updateInSet(this.props.track.id, {
        [effect.toLowerCase()]: newState.getIn(['sample', effect.toLowerCase()]).toJS()
      });
    }

    render() {
      return (
        <div className="controls">
          <div className="row">
            <span className="reset">
              <a href="#" onClick={this.reset}>
                <i className="fa fa-eraser" />
              </a>
            </span>
            <SubComponent ref="subComponent" {...this.props} />
          </div>
        </div>
      );
    }
  };

  SetTrackControls.propTypes = {
    track: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
  };

  return connect(function(state) {
    return {
      initialTrackState: initialTrackState
    };
  }, function(dispatch) {
    return {
      trackActions: bindActionCreators(TrackActions, dispatch)
    };
  }, function(stateProps, dispatchProps, ownProps) {
    return Object.assign(stateProps, dispatchProps, ownProps);
  })(SetTrackControls);
};
