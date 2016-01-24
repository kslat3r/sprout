import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetEditorWaveform from './sampler';

export default class SetEditorTrack extends Component {
  render() {
    var track = this.props.track;
    var imageSrc = '/images/thumbnail-placeholder.png';

    if (track.album.images[track.album.images.length - 2] && track.album.images[track.album.images.length - 2].url) {
      imageSrc = track.album.images[track.album.images.length - 2].url;
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <SetEditorWaveform track={track} />
        </div>
      </div>
    );
  }
};

SetEditorTrack.propTypes = {
  track: PropTypes.object.isRequired
};
