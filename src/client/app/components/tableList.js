import React, { Component, PropTypes } from 'react';
import Album from './album';
import Artist from './artist';
import Track from './track';
import Masonry from 'react-masonry-component';

export default class TableList extends Component {
  render() {
    if (this.props.items.length) {
      var items = this.props.items.map(function(item, i) {
        var elem;

        switch (this.props.type) {
          case 'album':
            elem = <Album data={item} />
          break;
          case 'artist':
            elem = <Artist data={item} />
          break;
          case 'track':
            elem = <Track data={item} />
          break;
        }

        return (
          <div className="col-xs-6 col-sm-4 col-md-3">
            {elem}
          </div>
        );
      }.bind(this));

      if (this.props.masonry) {
        return (
          <div>
            <h1>{this.props.title}</h1>
            <Masonry>
              {items}
            </Masonry>
          </div>
        );
      }

      return (
        <div>
          <h1>{this.props.title}</h1>
          <div>
            {items}
          </div>
        </div>
      );
    }

    return false;
  }
};

TableList.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};