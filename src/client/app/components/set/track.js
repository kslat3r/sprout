import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import Preview from '../player/preview';
import AlbumLink from '../link/album';

export default class SetTrack extends Component {
  render() {
    var track = this.props.track;
    var imageSrc = '/images/thumbnail-placeholder.png';

    if (track.album.images[track.album.images.length - 2] && track.album.images[track.album.images.length - 2].url) {
      imageSrc = track.album.images[track.album.images.length - 2].url;
    }

    return (
      <div className="thumbnail track">
        <div className="thumbnail-image">
          <img src={imageSrc} />
        </div>
        <Preview track={track} />
      </div>
    );
  }
};

SetTrack.propTypes = {
  track: PropTypes.object.isRequired
};
