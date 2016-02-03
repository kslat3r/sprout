import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import Preview from '../../player/preview';

export default class SetListTrack extends Component {
  render() {
    var track = this.props.track;
    var albumImages = track.album.images;
    var imageSrc = '/images/thumbnail-placeholder.png';

    if (albumImages[albumImages.length - 2] && albumImages[albumImages.length - 2].url) {
      imageSrc = albumImages[albumImages.length - 2].url;
    }

    return (
      <div className="thumbnail track">
        <div className="thumbnail-image">
          <img src={imageSrc} />
          <Preview track={track} />
        </div>
        <span className="name">{this.props.meta.name}</span>
      </div>
    );
  }
};

SetListTrack.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};
