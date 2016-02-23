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

class Set extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasRendered: false
    };
  }

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

    if (this.props.routeParams.trackId && this.props.routeParams.trackId !== nextProps.routeParams.trackId) {
      this.props.trackActions.stop(this.props.routeParams.trackId);
    }
  }

  requesting() {
    if (this.props.set.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.set.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.set.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  set() {
    if (!this.props.set.requesting && !this.props.set.errored) {
      var trackElem;

      if (this.props.routeParams.trackId) {
        var track = _.find(this.props.set.result.tracks, {id: this.props.routeParams.trackId});

        if (track) {
          var meta = Immutable.fromJS(this.props.set.meta[track.id]);

          trackElem = (
            <SetTrack track={track} meta={meta} index={0} />
          );
        }
      }

      return (
        <div className="set">
          {trackElem}
          <SetSlider set={this.props.set.result} preview={false} link={true} />
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
    set: state.get('set').toJS()
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch),
    playerActions: bindActionCreators(PlayerActions, dispatch),
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
})(Set);
