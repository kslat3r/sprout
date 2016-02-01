import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TracksTable from '../components/table/tracks';
import Paging from '../components/paging';
import * as TracksActions from '../actions/tracks';
import AuthorisationRequired from '../components/auth/authorisationRequired';

class Tracks extends Component {
  componentWillMount() {
    this.tracksPaging = this.props.tracksActions.paging.bind(this);
  }

  componentDidMount() {
    this.props.tracksActions.request();
  }

  componentWillUnmount() {
    this.props.tracksActions.reset();
  }

  requesting() {
    if (this.props.tracks.requesting) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    return false;
  }

  errored() {
    if (this.props.tracks.errored) {
      return (
        <div className="row">
          <div className="col-xs-12">
            {this.props.tracks.exception.message}
          </div>
        </div>
      );
    }

    return false;
  }

  tracks() {
    var tracks = this.props.tracks.result.tracks;

    return (
      <div>
        <div className="row">
          <TracksTable title="Tracks" tracks={tracks.items} />
          <Paging limit={tracks.limit} offset={tracks.offset} total={tracks.total} action={this.tracksPaging} type="tracks" length={tracks.items.length} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.requesting()}
        {this.errored()}
        {this.tracks()}
      </div>
    );
  }
};

Tracks = AuthorisationRequired(Tracks);

export default connect(function(state) {
  return {
    tracks: state.get('tracks'),
  };
}, function(dispatch) {
  return {
    tracksActions: bindActionCreators(TracksActions, dispatch)
  };
})(Tracks);
