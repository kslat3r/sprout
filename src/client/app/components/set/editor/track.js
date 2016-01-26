import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetEditorSampler from './sampler';
import ArtistLink from '../../link/artist';

export default class SetEditorTrack extends Component {
  render() {
    var track = this.props.track;
    var imageSrc = '/images/thumbnail-placeholder.png';

    if (track.album.images[track.album.images.length - 2] && track.album.images[track.album.images.length - 2].url) {
      imageSrc = track.album.images[track.album.images.length - 2].url;
    }

    return (
      <div className="m-b-40 b-b-solid p-b-40 editor-track col-xs-12">
        <div className="row m-b-20">
          <div className="col-xs-1 no-padding">
            <img src={imageSrc} className="img-responsive" />
          </div>
          <div className="col-xs-11">
            <h3>
              {this.props.track.name}
            </h3>
            <h4>
              <ArtistLink artists={this.props.track.artists} />
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <SetEditorSampler track={track} index={this.props.index} />
          </div>
        </div>
      </div>
    );
  }
};

SetEditorTrack.propTypes = {
  track: PropTypes.object.isRequired
};
