import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ArtistLink from '../link/artist';
import SetEditorSampler from './editor/sampler';
import SetEditorEQ from './editor/eq';
import SetEditorReverb from './editor/reverb';
import SetEditorCompressor from './editor/compressor';

export default class SetTrack extends Component {
  render() {
    var track = this.props.track;
    var meta = this.props.meta;
    var imageSrc = '/images/thumbnail-placeholder.png';

    if (track.album.images[track.album.images.length - 2] && track.album.images[track.album.images.length - 2].url) {
      imageSrc = track.album.images[track.album.images.length - 2].url;
    }

    return (
      <div className="m-b-40 b-b-solid p-b-40 set-track col-xs-12">
        <div className="row m-b-20">
          <div className="col-xs-1 no-padding">
            <img src={imageSrc} className="img-responsive" />
          </div>
          <div className="col-xs-11">
            <h3>
              {track.name}
            </h3>
            <h4>
              <ArtistLink artists={track.artists} />
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <SetEditorSampler track={track} meta={meta} />
            <SetEditorEQ track={track} meta={meta} />
            <SetEditorReverb track={track} meta={meta} />
            <SetEditorCompressor track={track} meta={meta} />
          </div>
        </div>
      </div>
    );
  }
};

SetTrack.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};
