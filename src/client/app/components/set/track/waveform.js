import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import SetTrackWaveformControls from './controls/waveform';
import diff from 'immutablediff';
import * as effectsUtils from '../../../utils/effects';
import * as regionUtils from '../../../utils/region';

class SetTrackWaveform extends Component {
  constructor(props) {
    super(props);

    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    this.state = {
      region: null,
      panner: null,
      setFiltersTimeout: null
    };
  }

  componentDidMount() {
    this.initialise(this.props);
  }

  componentWillUnmount() {
    this.destroy();
  }

  componentWillReceiveProps(nextProps) {
    
    //new track loaded

    if (this.props.track.id !== nextProps.track.id) {
      this.destroy();
      this.initialise(nextProps);
    }

    //region

    if (nextProps.meta.get('startPosition') === null || nextProps.meta.get('endPosition') === null) {
      regionUtils.removeRegionFromWaveform.bind(this);
    }

    //meta

    if (diff(this.props.meta.get('sample'), nextProps.meta.get('sample')).size > 0) {
      return effectsUtils.bindEffectsToAudioContext.call(this, nextProps);
    }

    //control

    if (nextProps.meta.get('isPlaying')) {
      if (this.state.region) {
        regionUtils.seekToRegion.call(this, this.state.region);

        setTimeout(() => {
          this.ws.play();
        }.bind(this), 10);
      }
      else {
        this.ws.play();
      }
    }
    else if (nextProps.meta.get('isStopped')) {
      if (this.ws.isPlaying()) {
        this.ws.stop();
      }

      if (nextProps.meta.getIn(['sample', 'startPosition']) && nextProps.meta.getIn(['sample', 'endPosition'])) {
        this.ws.seekTo(nextProps.meta.getIn(['sample', 'startPosition']) / this.ws.getDuration());
      }
      else {
        this.ws.seekTo(0);
      }
    }
    else if (nextProps.meta.get('isPaused')) {
      this.ws.pause();
    }
  }

  initialise(props) {
    if (!this.ws) {
      this.ws = Object.create(WaveSurfer);
    }

    this.ws.init(Object.assign({}, props.sampler.wsOptions, {
      container: this.refs.wavesurfer
    }));

    this.ws.load(props.track.preview_url);
    this.ws.enableDragSelection(props.sampler.dragOptions);

    this.bindEvents();

    effectsUtils.bindEffectsToAudioContext.call(this, props);
  }

  destroy() {
    if (this.ws) {
      this.ws.destroy();
      this.ws = undefined;
    }

    this.state = {
      region: null,
      panner: null,
      setFiltersTimeout: null
    };
  }

  bindEvents() {
    this.ws.on('ready', this.onReady.bind(this));
    this.ws.on('finish', this.onFinish.bind(this));
    this.ws.on('region-update-end', regionUtils.onRegionUpdated.bind(this));
  }

  onReady() {
    this.props.trackActions.hasLoaded(this.props.track.id);

    //region

    if (this.props.meta.getIn(['sample', 'startPosition']) && this.props.meta.getIn(['sample', 'endPosition'])) {
      regionUtils.bindRegionToWaveform.call(this);
    }
  }

  onFinish() {
    this.props.trackActions.stop(this.props.track.id);

    if (this.props.meta.get('isLooped')) {
      this.props.trackActions.play(this.props.track.id);
    }
  }

  render() {
    var controls;
    var throbber;

    if (this.props.meta.get('hasLoaded')) {
      controls = <SetTrackWaveformControls track={this.props.track} meta={this.props.meta} />;
    }

    if (!this.props.meta.get('hasLoaded')) {
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

SetTrackWaveform.propTypes = {
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
})(SetTrackWaveform);
