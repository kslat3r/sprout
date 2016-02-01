import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ArtistsActions from '../actions/artists';
import Grid from '../components/grid';
import Paging from '../components/paging';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Artists extends Component {
  componentWillMount() {
    this.artistsPaging = this.props.artistsActions.paging.bind(this);
  }

  componentDidMount() {
    this.props.artistsActions.request();
  }

  componentWillUnmount() {
    this.props.artistsActions.reset();
  }

  requesting() {
    if (this.props.artists.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.artists.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.artists.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  artists() {
    var artists = this.props.artists.result.artists;

    return (
      <div>
        <div className="row">
          <Grid title="Artists" type="artist" items={artists.items} masonry />
          <Paging limit={artists.limit} cursor={artists.cursors.after} total={artists.total} action={this.artistsPaging} type="artists" length={artists.items.length} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.requesting()}
        {this.errored()}
        {this.artists()}
      </div>
    );
  }
};

Artists = AuthorisationRequired(Artists);

export default connect(function(state) {
  return {
    artists: state.get('artists')
  };
}, function(dispatch) {
  return {
    artistsActions: bindActionCreators(ArtistsActions, dispatch)
  };
})(Artists);
