import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import ArtistLink from '../../link/artist';
import SetTrackWaveform from './waveform';
import SetTrackEffectsPan from './effects/pan';
import SetTrackEffectsVolume from './effects/volume';
import SetTrackEffectsEQ from './effects/eq';
import SetTrackEffectsCompressor from './effects/compressor';
import SetTrackEffectsDelay from './effects/delay';

class SetTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditName: false
    };

    this.showEditName = this.showEditName.bind(this);
    this.setName = this.setName.bind(this);
    this.saveName = this.saveName.bind(this);
  }

  componentDidUpdate() {
    if (this.refs.newName) {
      this.refs.newName.focus();
    }
  }

  showEditName() {
    this.setState({
      showEditName: true
    });
  }

  setName(e) {
    this.props.trackActions.setName(this.props.track.id, e.target.value);
  }

  saveName(e) {
    e.preventDefault();

    this.props.trackActions.updateInSet(this.props.track.id, {name: this.props.meta.get('name')});

    this.setState({
      showEditName: false
    });
  }

  render() {
    var track = this.props.track,
      meta = this.props.meta,
      imageSrc = '/images/thumbnail-placeholder.png',
      sampleName,
      pan,
      volume,
      eq,
      compressor,
      delay;

    if (track.album.images[track.album.images.length - 2] && track.album.images[track.album.images.length - 2].url) {
      imageSrc = track.album.images[track.album.images.length - 2].url;
    }

    if (!this.state.showEditName) {
      sampleName = (
        <h3>
          {meta.get('name')}
          <span className="edit" onClick={this.showEditName}>
            <i className="fa fa-pencil" />
          </span>
        </h3>
      );
    }
    else {
      sampleName = (
        <form onSubmit={this.saveName} className="form-inline editName">
          <div className="form-group input-group input-group-sm">
            <input ref="newName" type="text" className="form-control" placeholder="New name" onChange={this.setName} />
          </div>
        </form>
      );
    }

    if (meta.get('hasLoaded')) {
      pan = <SetTrackEffectsPan track={track} meta={meta} />;
      volume = <SetTrackEffectsVolume track={track} meta={meta} />;
      eq = <SetTrackEffectsEQ track={track} meta={meta} />;
      compressor = <SetTrackEffectsCompressor track={track} meta={meta} />;
      delay = <SetTrackEffectsDelay track={track} meta={meta} />;
    }

    return (
      <div className="p-b-20 set-track col-xs-12">
        <div className="row m-b-20">
          <div className="col-xs-1 no-padding">
            <img src={imageSrc} className="img-responsive" />
          </div>
          <div className="col-xs-8">
            {sampleName}
            <h4>
              {track.name}
            </h4>
            <h5>
              <ArtistLink artists={track.artists} />
            </h5>
          </div>
          <div className="col-xs-2">
            {pan}
          </div>
          <div className="col-xs-2">
            {volume}
          </div>
        </div>
        <div className="row ">
          <div className="col-xs-12">
            <SetTrackWaveform track={track} meta={meta} />
            <div className="effects">
              {compressor}
              {delay}
              {eq}
            </div>
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
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetTrack);
