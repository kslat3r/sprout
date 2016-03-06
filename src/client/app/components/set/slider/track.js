import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import Preview from '../../player/preview';
import SetTrackLink from '../../link/setTrack';

export default class SetSliderTrack extends Component {
  render() {
    var track = this.props.track;
    var meta = this.props.meta;
    var albumImages = track.album.images;
    var imageSrc = '/images/thumbnail-placeholder.png';
    var preview;

    if (albumImages[albumImages.length - 2] && albumImages[albumImages.length - 2].url) {
      imageSrc = albumImages[albumImages.length - 2].url;
    }

    if (this.props.preview === true) {
      preview = (
        <Preview track={track} meta={meta} />
      );
    }

    var name = this.props.meta.name !== '' ? this.props.meta.name : <span>&nbsp;</span>;

    var elem = (
      <div>
        <div className="thumbnail-image">
          <img src={imageSrc} />
          {preview}
        </div>
        <span className="name">{name}</span>
      </div>
    );

    if (this.props.link === false) {
      return (
        <div className="thumbnail track">
          {elem}
        </div>
      );
    }

    return (
      <div className="thumbnail track">
        <SetTrackLink set={this.props.set} track={this.props.track}>
          {elem}
        </SetTrackLink>
      </div>
    );
  }
};

SetSliderTrack.propTypes = {
  set: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  preview: PropTypes.bool.isRequired,
  link: PropTypes.bool.isRequired
};
