import React, { Component, PropTypes } from 'react';
import Row from './row';
import Masonry from 'react-masonry-component';

export default class Table extends Component {
  render() {
    if (this.props.items.length) {
      var columns = [
        'add',
        'preview',
        'name',
        'artists',
        'album.name'
      ];

      var rows = this.props.items.map(function(item, i) {
        return <Row data={item} columns={columns} key={i} />;
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

Table.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};