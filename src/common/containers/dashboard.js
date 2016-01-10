import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../components/search/search';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1>Dashboard</h1>
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

Dashboard = AuthorisationRequired(Dashboard);

export default Dashboard;