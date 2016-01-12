import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Preview from '../player/preview';
import Add from '../player/add';
import ArtistLink from '../link/artist';
import AlbumLink from '../link/album';

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
        return (
          <td key={i}>
            <ArtistLink artists={this.props.data.artists} />
          </td>
        );
      }

      if (column === 'album') {
        return (
          <td key={i}>
            <AlbumLink album={this.props.data.album}>
              {this.props.data.album.name}
            </AlbumLink>
          </td>
        );
      }

      return (
        <td key={i}>
          {_.get(this.props.data, column)}
        </td>
      );
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
