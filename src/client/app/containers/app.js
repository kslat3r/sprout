import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navigation from '../components/navigation';
import PlayerBar from '../components/player/bar';
import * as AlbumsActions from '../actions/albums';
import * as ArtistsActions from '../actions/artists';
import * as PlaylistsActions from '../actions/playlists';
import * as SetsActions from '../actions/sets';
import * as TracksActions from '../actions/tracks';

class App extends Component {
  componentWillMount() {
    this.props.albumsActions.request();
    this.props.artistsActions.request();
    this.props.playlistsActions.request();
    this.props.setsActions.request();
    this.props.tracksActions.request();
  }

  render() {
    var navigation;
    var playerBar;

    if (this.props.user) {
      navigation = <Navigation {...this.props} {...this.state} />;
      playerBar = <PlayerBar {...this.props} {...this.state} />;
    }

    return (
      <div>
        {navigation}
        <div className="container" id="main">
          {this.props.children}
        </div>
        {playerBar}
      </div>
    );
  }
};

export default connect(function(state) {
  return {
    user: state.get('auth').user
  };
}, function(dispatch) {
  return {
    albumsActions: bindActionCreators(AlbumsActions, dispatch),
    artistsActions: bindActionCreators(ArtistsActions, dispatch),
    playlistsActions: bindActionCreators(PlaylistsActions, dispatch),
    setsActions: bindActionCreators(SetsActions, dispatch),
    tracksActions: bindActionCreators(TracksActions, dispatch)
  };
})(App);
