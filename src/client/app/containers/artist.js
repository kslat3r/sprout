import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Artist extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <h1>Artist</h1>
        </div>
      </div>
    );
  }
};

Artist = AuthorisationRequired(Artist);

export default Artist;