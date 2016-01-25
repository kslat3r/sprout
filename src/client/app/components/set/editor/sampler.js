import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetEditorSamplerControls from './samplerControls';
import SetEditorEQ from './eq';
import SetEditorEQControls from './eqControls';
import * as SetActions from '../../../actions/set';

class SetEditorSampler extends Component {
  constructor(props) {
    super(props);

    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    this.state = Object.assign({}, this.props.sampler)
    this.state.ref = 'wavesurfer_' + this.props.index;
    this.ws = Object.create(WaveSurfer);

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.rewind = this.rewind.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.clear = this.clear.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.ws.init(Object.assign({}, this.state.wsOptions, {
      container: this.refs[this.state.ref]
    }));

    this.ws.load(this.props.track.preview_url);
    this.ws.enableDragSelection(this.state.dragOptions);
    this.bindEvents();
  }

  componentWillUnmount() {
    this.ws.destroy();
    this.ws = undefined;
  }

  bindEvents() {
    this.ws.on('ready', this.onReady.bind(this));
    this.ws.on('finish', this.onFinish.bind(this));
    this.ws.on('region-update-end', this.onRegionUpdated.bind(this));
  }

  onReady() {

    //eq

    var filters = this.state.EQ.map((band) => {
      var value = this.props.track.meta.eq[band.f];
      var filter = this.ws.backend.ac.createBiquadFilter();

      filter.type = band.type;
      filter.gain.value = value;
      filter.Q.value = 1;
      filter.frequency.value = band.f;

      return filter;
    }.bind(this));

    this.ws.backend.setFilters(filters);

    this.setState({
      filters: filters
    });

    //sample

    if (this.props.track.meta.startPosition && this.props.track.meta.endPosition) {
      var Region = this.ws.addRegion({
        start: this.props.track.meta.startPosition,
        end: this.props.track.meta.endPosition,
        color: this.state.dragOptions.color
      });

      this.onRegionOut(Region);
      this.seekToRegion(Region);

      this.setState({
        region: Region
      });
    }
  }

  onFinish() {
    this.stop();

    if (this.state.isLooped) {
      this.play();
    }
  }

  onRegionUpdated(Region, e) {
    if (this.state.region && e.toElement.className !== 'wavesurfer-region') {
      this.state.region.remove();
      this.stop();
    }

    this.setState({
      region: Region
    });

    this.props.setActions.updateTrack({
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
      if (this.state.isLooped === true) {
        this.play();
      }
      else if (this.state.isPlaying) {
        this.stop();
      }
    }.bind(this));
  }

  seekToRegion(Region) {
    setTimeout(() => {
      this.ws.seekTo(Region.start / this.ws.backend.buffer.duration);
    }.bind(this), 10);
  }

  play() {
    this.setState({
      isPlaying: true,
      isPaused: false,
      isStopped: false
    });

    if (this.state.region) {
      this.ws.play(this.state.region.start);
    }
    else {
      this.ws.play();
    }
  }

  pause() {
    this.setState({
      isPlaying: false,
      isPaused: true,
      isStopped: false
    });

    this.ws.pause(); //there's a bug here where pausing doesnt work in a region
  }

  stop() {
    this.setState({
      isPlaying: false,
      isPaused: false,
      isStopped: true
    });

    this.ws.stop();

    if (this.state.region) {
      this.ws.seekTo(this.state.region.start / this.ws.backend.buffer.duration);
    }
  }

  rewind() {
    this.stop();

    if (this.state.isPlaying) {
      this.play();
    }
  }

  toggleLoop() {
    this.setState({
      isLooped: !this.state.isLooped
    });
  }

  clear() {
    if (this.state.region) {
      this.state.region.remove();
    }

    this.props.setActions.updateTrack({
      id: this.props.track.id,
      params: {
        startPosition: null,
        endPosition: null
      }
    });

    this.setState({
      region: null
    });
  }

  remove() {
    this.props.setActions.deleteTrack({
      id: this.props.track.id
    });
  }

  render() {
    var eq,
      eqControls,
      setEditorSampleControlsProps = {
        isPlaying: this.state.isPlaying,
        isLooped: this.state.isLooped,
        pause: this.pause,
        play: this.play,
        rewind: this.rewind,
        stop: this.stop,
        toggleLoop: this.toggleLoop,
        clear: this.clear,
        remove: this.remove
      };

    return (
      <div className="sampler">
        <div className="row">
          <div className="col-xs-11">
            <div ref={this.state.ref} className="waveform" />
          </div>
          <div className="col-xs-1">
            <SetEditorSamplerControls {...setEditorSampleControlsProps} />
          </div>
        </div>
        <div className="row m-t-10">
          <div className="col-xs-11">
            <SetEditorEQ filters={this.state.filters} track={this.props.track} />
          </div>
          <div className="col-xs-1">
            <SetEditorEQControls />
          </div>
        </div>
      </div>
    );
  }
}

SetEditorSampler.propTypes = {
  track: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default connect(function(state) {
  return {
    sampler: state.sampler
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch)
  };
})(SetEditorSampler);