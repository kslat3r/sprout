import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import Preview from '../player/preview';
import Add from '../player/add';

export default class Row extends Component {
  render() {
    var columns = this.props.columns.map(function(column, i) {
      if (column === 'add') {
        return (
          <td key={i}>
            <Add track={this.props.data} />
          </td>
        );
      }

      if (column === 'preview') {
        return (
          <td key={i}>
            <Preview track={this.props.data} />
          </td>
        );
      }

      if (column === 'artists') {
        var artists = '';

        this.props.data.artists.forEach(function(artist, i) {
          artists += artist.name + ', ';
        });

        artists = artists.replace(/,\s$/, '');

        return <td key={i}>{artists}</td>;
      }

      return <td key={i}>{_.get(this.props.data, column)}</td>;
    }.bind(this));

    return (
      <tr>
        {columns}
      </tr>
    );
  }
};

Row.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};
