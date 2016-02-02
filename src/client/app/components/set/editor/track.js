import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArtistLink from '../../link/artist';
import SetEditorSampler from './sampler';
import SetEditorEQ from './eq';

class SetTrack extends Component {
  render() {
    var track = this.props.track;
    var meta = this.props.meta;
    var imageSrc = '/images/thumbnail-placeholder.png';
    var eq;

    if (track.album.images[track.album.images.length - 2] && track.album.images[track.album.images.length - 2].url) {
      imageSrc = track.album.images[track.album.images.length - 2].url;
    }

    if (meta.get('hasLoaded')) {
      eq = (
        <SetEditorEQ track={track} meta={meta} />
      );
    }

    return (
      <div className="m-b-20 b-b-solid p-b-20 set-track col-xs-12">
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
            {eq}
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

export default connect(function(state) {
  return {
    sampler: state.get('sampler').toJS()
  };
}, function(dispatch) {
  return {};
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetTrack);
