import React, { Component } from 'react';
import { connect } from 'react-redux';
import PictureList from './pictureList';
import TableList from './tableList';
import * as SearchActions from '../actions/search';

class Search extends Component {
  handleChange(key, e) {
    this.props.search[key] = e.target.value;
  }

  submit(e) {
    e.preventDefault();

    if (this.props.search.term !== '') {
      this.props.dispatch(SearchActions.request({
        term: this.props.search.term
      }));
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
        <form className="form-inline" onSubmit={this.submit.bind(this)}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search for an album/artist/track" onChange={this.handleChange.bind(this, 'term')} />
          </div>
          <button type="submit" className="btn btn-success">Search</button>
        </form>
        {this.requesting()}
        {this.errored()}
        <div className="row">
          <PictureList title="Artists" type="artist" items={this.props.search.results.artists} masonry />
        </div>
        <div className="row">
          <PictureList title="Albums" type="album" items={this.props.search.results.albums} masonry />
        </div>
        <div className="row">
          <TableList title="Tracks" type="track" items={this.props.search.results.tracks} />
        </div>
      </div>
    );
  }
};

export default connect(function(state) {
  return {
    search: state.search
  };
})(Search);