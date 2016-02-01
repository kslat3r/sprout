import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetActions from '../actions/set';
import * as PlayerActions from '../actions/player';
import AuthorisationRequired from '../components/auth/authorisationRequired';
import SetEditorTrack from '../components/set/editor/track';

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
    var tracks;

    if (this.props.set.result.tracks.length) {
      tracks = this.props.set.result.tracks.map((track, i) => {
        return (
          <SetEditorTrack track={track} meta={this.props.set.meta[track.id]} index={i} key={i} />
        );
      });
    }

    if (!this.props.set.requesting && !this.props.set.errored) {
      return (
        <div className="set">
          <div className="row">
            <h2>{this.props.set.result.name}</h2>
          </div>
          {tracks}
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
    playerActions: bindActionCreators(PlayerActions, dispatch)
  };
})(Set);
