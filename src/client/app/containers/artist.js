import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ArtistActions from '../actions/artist';
import Grid from '../components/grid';
import ArtistTitle from '../components/title/artist';
import TracksTable from '../components/table/tracks';
import Paging from '../components/paging';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Artist extends Component {
  componentWillMount() {
    this.albumsPaging = this.props.artistActions.paging.bind(this);
  }

  componentDidMount() {
    this.props.artistActions.request({
      id: this.props.routeParams.id
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.id !== nextProps.routeParams.id) {
      this.props.artistActions.request({
        id: nextProps.routeParams.id
      });

      if (window) {
        window.scrollTo(0, 0);
      }
    }
  }

  componentWillUnmount() {
    this.props.artistActions.reset();
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
      var albums = this.props.artist.result.albums;
      var tracks = this.props.artist.result.tracks;

      return (
        <div>
          <div className="row">
            <div className="m-t-20 col-xs-12 col-sm-6 col-md-4 col-lg-4">
              <ArtistTitle data={this.props.artist.result} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Grid title="Albums" type="album" items={albums.items} limit={albums.limit} offset={albums.offset} total={albums.total} masonry />
              <Paging limit={albums.limit} offset={albums.offset} total={albums.total} action={this.albumsPaging} id={this.props.artist.result.id} length={albums.items.length} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <TracksTable title="Top Tracks" tracks={tracks.items} />
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
    artist: state.get('artist').toJS()
  };
}, function(dispatch) {
  return {
    artistActions: bindActionCreators(ArtistActions, dispatch)
  };
})(Artist);
