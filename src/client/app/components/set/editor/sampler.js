import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import SetEditorSamplerControls from './samplerControls';

class SetEditorSampler extends Component {
  constructor(props) {
    super(props);

    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    this.ws = Object.create(WaveSurfer);
  }

  componentDidMount() {
    this.ws.init(Object.assign({}, this.props.sampler.wsOptions, {
      container: this.refs.wavesurfer
    }));

    this.ws.load(this.props.track.preview_url);
    this.ws.enableDragSelection(this.props.sampler.dragOptions);
    this.bindEvents();
  }

  componentWillUnmount() {
    if (this.ws) {
      this.ws.destroy();
      this.ws = undefined;
    }
  }

  componentWillReceiveProps(nextProps) {

    //region

    if (this.props.region && nextProps.meta.startPosition === null && nextProps.meta.endPosition === null) {
      this.props.region.remove();
      this.props.region = null;

      return;
    }

    //eq

    if (!this.ws.backend.filters || !_.isEqual(this.props.meta.filters, nextProps.meta.filters)) {
      if (this.props.meta.filters[0] instanceof BiquadFilterNode) {
        this.ws.backend.setFilters(this.props.meta.filters);
      }
    }

    //control state

    if (nextProps.meta.isPlaying) {
      if (this.props.region) {
        this.seekToRegion(this.props.region);
      }

      this.ws.play();
    }
    else if (nextProps.meta.isStopped) {
      if (this.ws.isPlaying()) {
        this.ws.stop();
      }

      if (this.props.region) {
        this.ws.seekTo(this.props.region.start / this.ws.getDuration());
      }
      else {
        this.ws.seekTo(0);
      }
    }
    else if (nextProps.meta.isPaused) {
      this.ws.pause();
    }
  }

  bindEvents() {
    this.ws.on('ready', this.onReady.bind(this));
    this.ws.on('finish', this.onFinish.bind(this));
    this.ws.on('region-update-end', this.onRegionUpdated.bind(this));
  }

  onReady() {

    //eq

    var filters = this.props.meta.filters.map((band) => {
      var filter = this.ws.backend.ac.createBiquadFilter();

      filter.type = band.type;
      filter.gain.value = band.value;
      filter.frequency.value = band.frequency;
      filter.Q.value = 1;

      return filter;
    }.bind(this));

    this.props.trackActions.setFilters(this.props.track.id, filters);

    //reverb

    //var reverb = this.ws.backend.ac.createConvolver();

    //this.props.tracksAction.setReverb(this.props.track.id, reverb);

    //compressor

    //var compressor = this.ws.backend.ac.createDynamicsCompressor();

    //this.props.trackAction.setCompressor(this.props.track.id, compressor);

    //sample

    if (this.props.meta.startPosition && this.props.meta.endPosition) {
      var Region = this.ws.addRegion({
        start: this.props.meta.startPosition,
        end: this.props.meta.endPosition,
        color: this.props.sampler.dragOptions.color
      });

      this.onRegionOut(Region);
      this.seekToRegion(Region);

      this.props.region = Region;
    }
  }

  onFinish() {
    this.props.trackActions.stop(this.props.track.id);

    if (this.props.meta.isLooped) {
      this.props.trackActions.play(this.props.track.id);
    }
  }

  onRegionUpdated(Region, e) {
    if (this.props.region && e.toElement.className !== 'wavesurfer-region') {
      this.props.region.remove();
    }

    this.props.region = Region;

    var regionParams = {
      startPosition: Region.start,
      endPosition: Region.end
    };

    this.props.trackActions.updateInSet(this.props.track.id, regionParams);
    this.props.trackActions.setRegion(this.props.track.id, regionParams);

    this.seekToRegion(Region);
    this.onRegionOut(Region);
  }

  onRegionOut(Region) {
    Region.on('out', () => {
      if (this.props.meta.isLooped) {
        this.props.trackActions.play(this.props.track.id);
      }
      else if (this.props.meta.isPlaying) {
        this.props.trackActions.stop(this.props.track.id);
      }
    }.bind(this));
  }

  seekToRegion(Region) {
    setTimeout(() => {
      this.ws.seekTo(Region.start / this.ws.getDuration());
    }.bind(this), 10);
  }

  render() {
    return (
      <div className="sampler">
        <div className="row vertical-center">
          <div className="col-xs-11">
            <div ref="wavesurfer" className="waveform" />
          </div>
          <div className="col-xs-1">
            <SetEditorSamplerControls track={this.props.track} meta={this.props.meta} />
          </div>
        </div>
      </div>
    );
  }
}

SetEditorSampler.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    sampler: state.sampler
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetEditorSampler);