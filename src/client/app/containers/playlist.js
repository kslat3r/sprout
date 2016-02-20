import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlaylistActions from '../actions/playlist';
import PlaylistTitle from '../components/title/playlist';
import TracksTable from '../components/table/tracks';
import Paging from '../components/paging';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Playlist extends Component {
  componentWillMount() {
    this.tracksPaging = this.props.playlistActions.paging.bind(this);
  }

  componentDidMount() {
    this.props.playlistActions.request({
      id: this.props.routeParams.id
    });
  }

  componentWillUnmount() {
    this.props.playlistActions.reset();
  }

  requesting() {
    if (this.props.playlist.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.playlist.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.playlist.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  playlist() {
    if (this.props.playlist.result.id) {
      var tracks = this.props.playlist.result.tracks;

      return (
        <div>
          <div className="row">
            <div className="m-t-20 col-xs-12 col-sm-6 col-md-4 col-lg-4">
              <PlaylistTitle data={this.props.playlist.result} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <TracksTable tracks={tracks.items} />
              <Paging limit={tracks.limit} offset={tracks.offset} total={tracks.total} action={this.tracksPaging} id={this.props.playlist.result.id} length={tracks.items.length} />
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
        {this.playlist()}
      </div>
    );
  }
};

Playlist = AuthorisationRequired(Playlist);

export default connect(function(state) {
  return {
    playlist: state.get('playlist').toJS()
  };
}, function(dispatch) {
  return {
    playlistActions: bindActionCreators(PlaylistActions, dispatch)
  };
})(Playlist);
