import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <h1>Dashboard</h1>
        </div>
      </div>
    );
  }
};

Dashboard = AuthorisationRequired(Dashboard);

export default Dashboard;