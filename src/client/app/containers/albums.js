import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AlbumsActions from '../actions/albums';
import Grid from '../components/grid';
import Paging from '../components/paging';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Albums extends Component {
  componentWillMount() {
    this.albumsPaging = this.props.albumsActions.paging.bind(this);
  }

  componentDidMount() {
    this.props.albumsActions.request();
  }

  componentWillUnmount() {
    this.props.albumsActions.reset();
  }

  requesting() {
    if (this.props.albums.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.albums.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.albums.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  albums() {
    var albums = this.props.albums.result.albums;

    return (
      <div>
        <div className="row">
          <Grid title="Albums" type="album" items={albums.items} masonry />
          <Paging limit={albums.limit} offset={albums.offset} total={albums.total} action={this.albumsPaging} type="playlists" length={albums.items.length} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.requesting()}
        {this.errored()}
        {this.albums()}
      </div>
    );
  }
};

Albums = AuthorisationRequired(Albums);

export default connect(function(state) {
  return {
    albums: state.get('albums').toJS()
  };
}, function(dispatch) {
  return {
    albumsActions: bindActionCreators(AlbumsActions, dispatch)
  };
})(Albums);
