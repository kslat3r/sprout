import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Album extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <h1>Album</h1>
        </div>
      </div>
    );
  }
};

Album = AuthorisationRequired(Album);

export default Album;