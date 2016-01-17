import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AddControlActions from '../../../actions/addControl';
import TrackRow from './row';
import Masonry from 'react-masonry-component';

class TracksTable extends Component {
  componentWillUnmount() {
    this.props.addControlActions.reset();
  }

  render() {
    if (this.props.tracks.length) {
      var columns = [
        'add',
        'preview',
        'name',
        'artists',
        'album'
      ];

      var rows = this.props.tracks.map(function(track, i) {
        return <TrackRow track={track} columns={columns} key={i} />;
      });

      return (
        <div>
          <h2>{this.props.title}</h2>
          <div className="table-responsive">
            <table className="table tracks">
              <thead>
                <tr>
                  <th className="add"></th>
                  <th className="preview"></th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return false;
  }
};

TracksTable.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default connect(function(state) {
  return {};
}, function(dispatch) {
  return {
    addControlActions: bindActionCreators(AddControlActions, dispatch)
  };
})(TracksTable);