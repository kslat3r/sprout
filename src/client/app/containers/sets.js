import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetsActions from '../actions/sets';
import SetRow from '../components/set/list/row';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Sets extends Component {
  requesting() {
    if (this.props.sets.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.sets.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.sets.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  sets() {
    var sets = this.props.sets.results;

    if (!this.props.sets.requesting && !this.props.sets.errored) {
      return (
        <div>
          <div className="row">
            <h1>Sets</h1>
          </div>
          {sets.map((set, i) => {
            return <SetRow set={set} key={i} />;
          })}
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
        {this.sets()}
      </div>
    );
  }
};

Sets = AuthorisationRequired(Sets);

export default connect(function(state) {
  return {
    sets: state.sets
  };
}, function(dispatch) {
  return {
    setsActions: bindActionCreators(SetsActions, dispatch)
  };
})(Sets);