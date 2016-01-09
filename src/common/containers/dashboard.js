import React, { Component } from 'react';
import Search from '../components/search/search';

export default class Dashboard extends Component {
  render() {
    var userId = this.props.user ? this.props.user.id : '';

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1>{userId}'s Dashboard</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Search />
          </div>
        </div>
      </div>
    );
  }
};