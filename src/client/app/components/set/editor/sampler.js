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

    this.state = {
      ready: false
    };
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

    if (this.props.meta.region && nextProps.meta.startPosition === null && nextProps.meta.endPosition === null) {
      this.props.meta.region.remove();
      this.props.meta.region = null;

      return;
    }

    var filtersToSet = [];

    //filter

    if (nextProps.meta.filters[0] instanceof BiquadFilterNode) {
      filtersToSet = filtersToSet.concat(nextProps.meta.filters);
    }

    //compressor

    if (nextProps.meta.compressor instanceof DynamicsCompressorNode) {
      filtersToSet.push(nextProps.meta.compressor);
    }

    this.ws.backend.setFilters(filtersToSet);

    //control state

    if (nextProps.meta.isPlaying) {
      if (this.props.meta.region) {
        this.seekToRegion(this.props.meta.region);
      }

      this.ws.play();
    }
    else if (nextProps.meta.isStopped) {
      if (this.ws.isPlaying()) {
        this.ws.stop();
      }

      if (this.props.meta.region) {
        this.ws.seekTo(this.props.meta.region.start / this.ws.getDuration());
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
    this.setState({
      ready: true
    });

    //filters

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

    var reverb = this.ws.backend.ac.createConvolver();

    this.props.trackActions.setReverb(this.props.track.id, reverb);

    //compressor

    var compressor = this.ws.backend.ac.createDynamicsCompressor();

    Object.keys(this.props.meta.compressor).forEach((key) => {
      compressor[key].value = this.props.meta.compressor[key];
    });

    this.props.trackActions.setCompressor(this.props.track.id, compressor);

    //sample

    if (this.props.meta.startPosition && this.props.meta.endPosition) {
      var Region = this.ws.addRegion({
        start: this.props.meta.startPosition,
        end: this.props.meta.endPosition,
        color: this.props.sampler.dragOptions.color
      });

      this.onRegionOut(Region);
      this.seekToRegion(Region);

      this.props.meta.region = Region;
    }
  }

  onFinish() {
    this.props.trackActions.stop(this.props.track.id);

    if (this.props.meta.isLooped) {
      this.props.trackActions.play(this.props.track.id);
    }
  }

  onRegionUpdated(Region, e) {
    if (this.props.meta.region && e.toElement.className !== 'wavesurfer-region') {
      this.props.meta.region.remove();
    }

    this.props.meta.region = Region;

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
    var controls;
    var throbber;

    if (this.state.ready) {
      controls = <SetEditorSamplerControls track={this.props.track} meta={this.props.meta} />;
    }

    if (!this.state.ready) {
      throbber = (
        <div className="row">
          <div className="loading col-xs-12">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        </div>
      );
    }

    return (
      <div className="sampler">
        {throbber}
        <div className="row vertical-center">
          <div className="col-xs-11">
            <div ref="wavesurfer" className="waveform" />
          </div>
          <div className="col-xs-1">
            {controls}
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
