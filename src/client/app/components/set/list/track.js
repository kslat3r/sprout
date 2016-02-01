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
        </div>
        <Preview track={track} />
      </div>
    );
  }
};

SetListTrack.propTypes = {
  track: PropTypes.object.isRequired
};
