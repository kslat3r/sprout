import React, { Component, PropTypes } from 'react';
import Album from './album';
import Artist from './artist';
import Masonry from 'react-masonry-component';

export default class Grid extends Component {
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
        }

        return (
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={i}>
            {elem}
          </div>
        );
      }.bind(this));

      if (this.props.masonry) {
        var masonryOpts = {
          percentPosition: true
        };

        return (
          <div>
            <h2>{this.props.title}</h2>
            <Masonry options={masonryOpts} disableImagesLoaded={false}>
              {items}
            </Masonry>
          </div>
        );
      }

      return (
        <div>
          <h2>{this.props.title}</h2>
          <div>
            {items}
          </div>
        </div>
      );
    }

    return false;
  }
};

Grid.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};