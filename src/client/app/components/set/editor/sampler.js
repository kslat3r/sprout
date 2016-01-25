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
    this.toggleEQ = this.toggleEQ.bind(this);
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
    this.ws.on('region-update-end', this.onRegionUpdateEnd.bind(this));
  }

  onReady() {
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
  }

  onFinish() {
    this.stop();

    if (this.state.isLooped) {
      this.play();
    }
  }

  onRegionUpdateEnd(Region) {
    if (this.state.region) {
      this.state.region.remove();
    }

    this.setState({
      region: Region
    });

    Region.on('out', () => {
      if (this.state.isLooped === true) {
        this.play();
      }
      else if (this.state.isPlaying) {
        this.stop();
      }
    }.bind(this));

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

  toggleEQ() {
    this.setState({
      showEQ: !this.state.showEQ
    });
  }

  clear() {
    if (this.state.region) {
      this.state.region.remove();
    }

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
        toggleEQ: this.toggleEQ,
        clear: this.clear,
        remove: this.remove
      };

    if (this.state.showEQ) {
      eq = <SetEditorEQ filters={this.state.filters} track={this.props.track} />;
      eqControls = <SetEditorEQControls />;
    }

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
        <div className="row">
          <div className="col-xs-11">
            {eq}
          </div>
          <div className="col-xs-1">
            {eqControls}
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