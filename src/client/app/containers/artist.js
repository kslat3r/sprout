import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ArtistActions from '../actions/artist';
import Grid from '../components/grid';
import ArtistTitle from '../components/title/artist';
import TracksTable from '../components/table/tracks';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Artist extends Component {
  componentDidMount() {
    this.props.dispatch(ArtistActions.request({
      id: this.props.routeParams.id
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(ArtistActions.reset());
  }

  requesting() {
    if (this.props.artist.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.artist.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.artist.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  artist() {
    if (this.props.artist.result.id && !this.props.artist.requesting && !this.props.artist.errored) {
      return (
        <div>
          <div className="row">
            <div className="m-t-20 col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <ArtistTitle data={this.props.artist.result} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Grid title="Albums" type="album" items={this.props.artist.result.albums} masonry />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <TracksTable title="Tracks" tracks={this.props.artist.result.tracks} />
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
        {this.artist()}
      </div>
    );
  }
};

Artist = AuthorisationRequired(Artist);

export default connect(function(state) {
  return {
    artist: state.artist
  };
})(Artist);