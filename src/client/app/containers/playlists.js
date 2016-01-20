import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlaylistsActions from '../actions/playlists';
import Grid from '../components/grid';
import Paging from '../components/paging';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Playlists extends Component {
  componentWillMount() {
    this.playlistsPaging = this.props.playlistsActions.paging.bind(this);
  }

  componentDidMount() {
    this.props.playlistsActions.request();
  }

  componentWillUnmount() {
    this.props.playlistsActions.reset();
  }

  requesting() {
    if (this.props.playlists.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.playlists.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.playlists.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  playlists() {
    var playlists = this.props.playlists.result.playlists;

    return (
      <div>
        <div className="row">
          <Grid title="Playlists" type="playlist" items={playlists.items} masonry />
          <Paging limit={playlists.limit} offset={playlists.offset} total={playlists.total} action={this.playlistsPaging} type="playlists" length={playlists.items.length} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.requesting()}
        {this.errored()}
        {this.playlists()}
      </div>
    );
  }
};

Playlists = AuthorisationRequired(Playlists);

export default connect(function(state) {
  return {
    playlists: state.playlists
  };
}, function(dispatch) {
  return {
    playlistsActions: bindActionCreators(PlaylistsActions, dispatch)
  };
})(Playlists);