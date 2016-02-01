import React, { Component } from 'react';
import { connect } from 'react-redux'
import RedirectIfAuthorised from '../components/auth/redirectIfAuthorised';

class Home extends Component {
  render() {
    var loginUrl = this.props.config.apiUrl + '/auth/login';

    return (
      <div className="home">
        <a href={loginUrl} className="btn btn-success" role="button">Log In</a>
      </div>
    );
  }
};

Home = RedirectIfAuthorised(Home);

export default connect(function(state) {
  return {
    config: state.get('config')
  };
})(Home);
