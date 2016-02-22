import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../../actions/track';
import { initialTrackState } from '../../../../reducers/set';
import Immutable from 'immutable';

export default function(SubComponent, opts) {
  class SetTrackControls extends Component {
    constructor(props) {
      super(props);

      this.reset = this.reset.bind(this);
    }

    reset(e) {
      if (e) {
        e.preventDefault();
      }

      var defaultState = Immutable.fromJS(this.props.initialTrackState.sample['default' + _.capitalize(opts.effectName)]).merge({
        bypass: false
      });
      var newState = this.props.meta.setIn(['sample', opts.effectName.toLowerCase()], defaultState);

      this.props.trackActions['set' + _.capitalize(opts.effectName)](this.props.track.id, newState.getIn(['sample', opts.effectName.toLowerCase()]));
      this.props.trackActions.updateInSet(this.props.track.id, {
        [opts.effectName.toLowerCase()]: newState.getIn(['sample', opts.effectName.toLowerCase()]).toJS()
      });
    }

    render() {
      var reset;

      if (opts.hasReset === true) {
        reset = (
          <span className="reset">
            <a href="#" onClick={this.reset}>
              <i className="fa fa-eraser" />
            </a>
          </span>
        );
      }

      return (
        <div className="controls">
          <div className="row">
            {reset}
            <SubComponent {...this.props} {...this.state} />
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
