import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '../components/grid';
import TracksTable from '../components/table/tracks';
import * as SearchActions from '../actions/search';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Search extends Component {
  constructor() {
    this.searchChange = this.searchChange.bind(this);
  }

  componentDidMount() {
    if (this.props.router.location.query.searchTerm) {
      this.props.dispatch(SearchActions.update({
        term: this.props.router.location.query.searchTerm
      }));

      this.props.dispatch(SearchActions.request());
    }
  }

  searchChange(e) {
    this.props.dispatch(SearchActions.update({
      term: e.target.value
    }));
  }

  submit(e) {
    e.preventDefault();

    if (this.props.search.term !== '') {
      this.props.dispatch(SearchActions.request());
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
    return (
      <div>
        <div className="row">
          <h1>Search</h1>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-inline" onSubmit={this.submit.bind(this)}>
              <div className="form-group">
                <input type="text" className="form-control" value={this.props.search.term} placeholder="Search for an album/artist/track" onChange={this.searchChange} />
              </div>
              <button type="submit" className="btn btn-success">Search</button>
            </form>
            {this.requesting()}
            {this.errored()}
            <div className="row">
              <Grid title="Artists" type="artist" items={this.props.search.results.artists} masonry />
            </div>
            <div className="row">
              <Grid title="Albums" type="album" items={this.props.search.results.albums} masonry />
            </div>
            <div className="row">
              <TracksTable title="Tracks" tracks={this.props.search.results.tracks} />
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
})(Search);