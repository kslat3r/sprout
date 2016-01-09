import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    //var loginUrl = this.props.config.apiUrl + '/auth/login';
    var loginUrl = '';

    return (
      <div className="home">
        <a href={loginUrl} className="btn btn-success" role="button">Log In</a>
      </div>
    );
  }
};