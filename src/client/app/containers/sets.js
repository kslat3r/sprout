import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetsActions from '../actions/sets';
import SetSlider from '../components/set/slider';
import SetLink from '../components/link/set';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Sets extends Component {
  componentDidMount() {
    if (!this.props.sets.results.length && !this.props.sets.requesting) {
      this.props.setsActions.request();
    }
  }

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
          {sets.map((set, i) => {
            return (
              <div key={i} className="sets-set">
                <SetLink set={set}>
                  <h2>{set.name}</h2>
                </SetLink>
                <div className="col-xs-12">
                  <SetSlider set={set} preview={true} link={false} />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return false;
  }

  render() {
    return (
      <div className="sets">
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
    sets: state.get('sets').toJS()
  };
}, function(dispatch) {
  return {
    setsActions: bindActionCreators(SetsActions, dispatch)
  };
})(Sets);
