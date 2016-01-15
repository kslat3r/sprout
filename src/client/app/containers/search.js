import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '../components/grid';
import TracksTable from '../components/table/tracks';
import * as SearchActions from '../actions/search';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Search extends Component {
  constructor() {
    this.submit = this.submit.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  componentDidMount() {
    if (this.props.router.location.query.term) {
      this.props.update({
        term: this.props.router.location.query.term
      });

      this.props.request();
    }
  }

  searchChange(e) {
    this.props.update({
      term: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();

    if (this.props.search.term !== '') {
      this.props.request();
    }
  }

  requesting() {
    if (this.props.search.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.search.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.search.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  render() {
    var artists = this.props.search.results.artists;
    var albums = this.props.search.results.albums;
    var tracks = this.props.search.results.tracks;

    return (
      <div>
        <div className="row">
          <h1>Search</h1>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-inline" onSubmit={this.submit}>
              <div className="form-group">
                <input type="text" className="form-control" value={this.props.search.term} placeholder="Search for an album/artist/track" onChange={this.searchChange} />
              </div>
              <button type="submit" className="btn btn-success">Search</button>
            </form>
            {this.requesting()}
            {this.errored()}
            <div className="row">
              <Grid title="Artists" type="artist" items={artists.items} limit={artists.limit} offset={artists.offset} total={artists.total} masonry />
            </div>
            <div className="row">
              <Grid title="Albums" type="album" items={albums.items} limit={albums.limit} offset={albums.offset} total={albums.total} masonry />
            </div>
            <div className="row">
              <TracksTable title="Tracks" tracks={tracks.items} limit={tracks.limit} offset={tracks.offset} total={tracks.total} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Search = AuthorisationRequired(Search);

export default connect(function(state) {
  return {
    search: state.search,
    router: state.router
  };
}, SearchActions)(Search);