import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(SubComponent) {
  class RedirectIfAuthorised extends Component {
    componentWillMount() {
      if (this.props.user) {
        this.props.history.replaceState(null, '/sets');
      }
    }

    render() {
      return (
        <SubComponent {...this.props} />
      );
    }
  };

  return connect(function(state) {
    return {
      user: state.auth.user
    };
  })(RedirectIfAuthorised);
};