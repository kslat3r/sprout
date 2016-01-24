import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class SetEditorSampler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isPaused: false,
      isStopped: true,
      isLooped: false,
      showEQ: false,
      EQ: [{
        f: 32,
        type: 'lowshelf'
      },
      {
        f: 64,
        type: 'peaking'
      },
      {
        f: 125,
        type: 'peaking'
      },
      {
        f: 250,
        type: 'peaking'
      },
      {
        f: 500,
        type: 'peaking'
      },
      {
        f: 1000,
        type: 'peaking'
      },
      {
        f: 2000,
        type: 'peaking'
      },
      {
        f: 4000,
        type: 'peaking'
      },
      {
        f: 8000,
        type: 'peaking'
      },
      {
        f: 16000,
        type: 'highshelf'
      }],
      filters: []
    };

    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    this.ws = Object.create(WaveSurfer);

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.rewind = this.rewind.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.toggleEQ = this.toggleEQ.bind(this);
  }

  componentDidMount() {
    this.ws.init({
      container: this.refs.wavesurfer,
      height: 60,
      progressColor: '#999'
    });

    this.ws.enableDragSelection({
      loop: false,
      resize: true,
      drag: true
    });

    this.ws.load(this.props.track.preview_url);

    this.ws.on('ready', () => {
      this.createFilters();
    }.bind(this));

    this.ws.on('region-created', (Region) => {
      if (this.state.region) {
        this.state.region.remove();
      }

      this.setState({
        region: Region
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.ws.destroy();
    this.ws = undefined;
  }

  createFilters() {
    var filters = this.state.EQ.map((band) => {
      var filter = this.ws.backend.ac.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = 0;
      filter.Q.value = 1;
      filter.frequency.value = band.f;

      return filter;
    }.bind(this));

    this.ws.backend.setFilters(filters);

    this.setState({
      filters: filters
    });
  }

  play() {
    this.setState({
      isPlaying: true,
      isPaused: false,
      isStopped: false
    });

    this.ws.play();
  }

  pause() {
    this.setState({
      isPlaying: false,
      isPaused: true,
      isStopped: false
    });

    this.ws.pause();
  }

  stop() {
    this.setState({
      isPlaying: false,
      isPaused: false,
      isStopped: true
    });

    this.ws.stop();
  }

  rewind() {
    this.ws.stop();

    if (this.state.isPlaying) {
      this.ws.play();
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

  onFilterChange(filter, index, e) {
    filter.gain.value = ~~e.target.value;

    this.forceUpdate();
  }

  render() {
    var eq;
    var pauseOrPlay;
    var loopOrEnd;

    if (this.state.showEQ) {
      eq = (
        <div className="eq">
          {this.state.filters.map((filter, i) => {
            return (
              <div className="col-xs-1 filter" key={i}>
                <input type="range" min="-40" max="40" value={filter.gain.value} title={filter.frequency.value} orient="vertical" onChange={this.onFilterChange.bind(this, filter, i)} />
              </div>
            );
          }.bind(this))}
        </div>
      );
    }

    if (this.state.isPlaying) {
      pauseOrPlay = (
        <span className="pause">
          <a href="#" onClick={this.pause}>
            <i className="fa fa-pause" />
          </a>
        </span>
      );
    }
    else {
      pauseOrPlay = (
        <span className="play">
          <a href="#" onClick={this.play}>
            <i className="fa fa-play" />
          </a>
        </span>
      );
    }

    if (this.state.isLooped) {
      loopOrEnd = (
        <span className="loop">
          <a href="#" onClick={this.toggleLoop}>
            <i className="fa fa-long-arrow-right" />
          </a>
        </span>
      );
    }
    else {
      loopOrEnd = (
        <span className="loop">
          <a href="#" onClick={this.toggleLoop}>
            <i className="fa fa-repeat" />
          </a>
        </span>
      );
    }

    return (
      <div className="sampler">
        <div className="col-xs-10">
          <div ref="wavesurfer" className="waveform" />
          {eq}
        </div>
        <div className="col-xs-2 controls">
          <span className="rewind">
            <a href="#" onClick={this.rewind}>
              <i className="fa fa-backward" />
            </a>
          </span>
          {pauseOrPlay}
          <span className="stop">
            <a href="#" onClick={this.stop}>
              <i className="fa fa-stop" />
            </a>
          </span>
          {loopOrEnd}
          <span className="stop">
            <a href="#" onClick={this.toggleEQ}>
              <i className="fa fa-bar-chart" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

SetEditorSampler.propTypes = {
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
  };
})(SetEditorSampler);