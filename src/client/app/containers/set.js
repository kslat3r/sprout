import _ from 'lodash';
import Immutable from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetActions from '../actions/set';
import * as PlayerActions from '../actions/player';
import * as TrackActions from '../actions/track';
import AuthorisationRequired from '../components/auth/authorisationRequired';
import SetTrack from '../components/set/track';
import SetSlider from '../components/set/slider';
import SetSequencer from '../components/set/sequencer';
import SetTrackWaveform from '../components/set/track/waveform';

class Set extends Component {
  componentDidMount() {
    this.props.playerActions.reset();

    this.props.setActions.request({
      id: this.props.routeParams.id
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.id !== nextProps.routeParams.id) {
      this.props.setActions.request({
        id: nextProps.routeParams.id
      });
    }

    if (this.props.routeParams.trackId && nextProps.routeParams.trackId && this.props.routeParams.trackId !== nextProps.routeParams.trackId) {
      this.props.trackActions.stopCurrentAndLoadNext(this.props.routeParams.trackId, nextProps.routeParams.trackId);
    }
  }

  requesting() {
    if (this.props.set.get('requesting')) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.set.get('errored')) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.set.getIn(['exception', 'message'])}
          </div>
        </div>
      );
    }

    return false;
  }

  set() {
    if (!this.props.set.get('requesting') && !this.props.set.get('errored') && this.props.set.getIn(['result', 'tracks'])) {
      var elem;

      if (this.props.routeParams.trackId) {
        var track = this.props.set.getIn(['result', 'tracks']).find((track) => {
          return track.get('id') === this.props.routeParams.trackId;
        });

        if (track) {
          var meta = this.props.set.getIn(['meta', track.get('id')]);

          elem = (
            <SetTrack track={track.toJS()} meta={meta} />
          );
        }
      }
      else {
        elem = (
          <SetSequencer set={this.props.set.toJS()} />
        )
      }

      return (
        <div className="set">
          {elem}
          <SetSlider set={this.props.set.toJS()} preview={false} link={true} />
        </div>
      );
    }

    return false;
  }

  render() {
    return (
      <div>
        {this.requesting()}
        {this.errored()}
        {this.set()}
      </div>
    );
  }
};

Set = AuthorisationRequired(Set);

export default connect(function(state) {
  return {
    set: state.get('set')
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch),
    playerActions: bindActionCreators(PlayerActions, dispatch),
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(Set);
