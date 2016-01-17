import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetsActions from '../actions/sets';

class Root extends Component {
  componentWillMount() {
    this.props.setsActions.request();
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    );
  }
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {};
}, function(dispatch) {
  return {
    setsActions: bindActionCreators(SetsActions, dispatch)
  };
})(Root);

