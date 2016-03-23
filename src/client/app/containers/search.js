import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '../components/grid';
import TracksTable from '../components/table/tracks';
import Paging from '../components/paging';
import * as SearchActions from '../actions/search';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Search extends Component {
  componentWillMount() {
    this.artistsPaging = this.props.searchActions.paging.bind(this);
    this.albumsPaging = this.props.searchActions.paging.bind(this);
    this.tracksPaging = this.props.searchActions.paging.bind(this);

    if (this.props.location.query.term) {
      this.props.searchActions.update({
        term: this.props.location.query.term
      });

      this.props.searchActions.request();
      this.props.history.pushState(null, this.props.location.pathname, {term: this.props.location.query.term});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.search.term !== nextProps.search.term) {
      this.props.searchActions.request();
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
      <div className="search">
        <div className="row">
          <h1>Search for "{this.props.search.term}"</h1>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.requesting()}
            {this.errored()}
            <div className="row">
              <Grid title="Artists" type="artist" items={artists.items} masonry />
              <Paging limit={artists.limit} offset={artists.offset} total={artists.total} action={this.artistsPaging} type="artists" length={artists.items.length} />
            </div>
            <div className="row">
              <Grid title="Albums" type="album" items={albums.items} masonry />
              <Paging limit={albums.limit} offset={albums.offset} total={albums.total} action={this.albumsPaging} type="albums" length={albums.items.length} />
            </div>
            <div className="row">
              <TracksTable title="Tracks" tracks={tracks.items} />
              <Paging limit={tracks.limit} offset={tracks.offset} total={tracks.total} action={this.tracksPaging} type="tracks" length={tracks.items.length} />
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
    search: state.get('search').toJS()
  };
}, function(dispatch) {
  return {
    searchActions: bindActionCreators(SearchActions, dispatch)
  };
})(Search);
