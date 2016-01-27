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
      region: null
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
    console.log(nextProps);
  }

  bindEvents() {
    this.ws.on('ready', this.onReady.bind(this));
    this.ws.on('finish', this.onFinish.bind(this));
    this.ws.on('region-update-end', this.onRegionUpdated.bind(this));
  }

  onReady() {

    //eq

    var filters = this.props.meta.EQ.map((band) => {
      var filter = this.ws.backend.ac.createBiquadFilter();

      filter.type = band.type;
      filter.gain.value = band.value;
      filter.Q.value = 1;
      filter.frequency.value = band.f;

      return filter;
    }.bind(this));

    this.ws.backend.setFilters(filters);

    //sample

    if (this.props.meta.startPosition && this.props.meta.endPosition) {
      var Region = this.ws.addRegion({
        start: this.props.meta.startPosition,
        end: this.props.meta.endPosition,
        color: this.props.sampler.dragOptions.color
      });

      this.onRegionOut(Region);
      this.seekToRegion(Region);

      this.setState({
        region: Region
      });
    }
  }

  onFinish() {
    this.props.trackActions.stop(this.props.track.id);

    if (this.props.meta.isLooped) {
      this.props.trackActions.play(this.props.track.id);
    }
  }

  onRegionUpdated(Region, e) {
    if (this.state.region && e.toElement.className !== 'wavesurfer-region') {
      this.state.region.remove();

      if (this.props.meta.isPlaying) {
        this.props.trackActions.stop(this.props.track.id);
      }
    }

    this.setState({
      region: Region
    });

    this.props.trackActions.updateInSet({
      id: this.props.track.id,
      params: {
        startPosition: Region.start,
        endPosition: Region.end
      }
    });

    this.seekToRegion(Region);
    this.onRegionOut(Region);
  }

  onRegionOut(Region) {
    Region.on('out', () => {
      if (this.props.meta.isLooped === true) {
        this.props.trackActions.play(this.props.track.id);
      }
      else if (this.props.meta.isPlaying) {
        this.props.trackActions.stop(this.props.track.id);
      }
    }.bind(this));
  }

  seekToRegion(Region) {
    setTimeout(() => {
      this.ws.seekTo(Region.start / this.ws.backend.buffer.duration);
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
})(SetEditorSampler);