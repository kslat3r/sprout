import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetActions from '../actions/set';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Set extends Component {
  componentDidMount() {
    this.props.setActions.request({
      id: this.props.routeParams.id
    });
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
            {this.props.playlists.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  set() {
    var set = this.props.set.result;

    if (!this.props.set.requesting && !this.props.set.errored) {
      return (
        <div>
          <div className="row">
            <h2>{this.props.set.name}</h2>
          </div>
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
    set: state.set
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch)
  };
})(Set);