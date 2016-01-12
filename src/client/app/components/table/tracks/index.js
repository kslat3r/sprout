import React, { Component, PropTypes } from 'react';
import TrackRow from './row';
import Masonry from 'react-masonry-component';

export default class TracksTable extends Component {
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
          <h1>{this.props.title}</h1>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
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
      );
    }

    return false;
  }
};

TracksTable.propTypes = {
  tracks: PropTypes.array.isRequired
};