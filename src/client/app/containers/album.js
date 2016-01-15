import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AlbumActions from '../actions/album';
import AlbumTitle from '../components/title/album';
import TracksTable from '../components/table/tracks';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Album extends Component {
  componentDidMount() {
    this.props.dispatch(AlbumActions.request({
      id: this.props.routeParams.id
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(AlbumActions.reset());
  }

  requesting() {
    if (this.props.album.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.album.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.album.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  album() {
    if (this.props.album.result.id && !this.props.album.requesting && !this.props.album.errored) {
      return (
        <div>
          <div className="row">
            <div className="m-t-20 col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <AlbumTitle data={this.props.album.result} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <TracksTable title="Tracks" tracks={this.props.album.result.tracks} />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.requesting()}
        {this.errored()}
        {this.album()}
      </div>
    );
  }
};

Album = AuthorisationRequired(Album);

export default connect(function(state) {
  return {
    album: state.album
  };
})(Album);