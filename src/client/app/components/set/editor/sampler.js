import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import SetEditorSamplerControls from './samplerControls';
import diff from 'immutablediff';

class SetEditorSampler extends Component {
  constructor(props) {
    super(props);

    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    this.ws = Object.create(WaveSurfer);

    this.state = {
      region: null,
      eqInit: false,
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

    if (nextProps.meta.get('startPosition') === null || nextProps.meta.get('endPosition') === null) {
      if (this.state.region) {
        this.state.region.remove();
        this.state.region = null;
      }
    }

    //eq

    if (!this.state.eqInit || diff(this.props.meta.get('eq'), nextProps.meta.get('eq')).length > 0) {
      this.ws.backend.setFilters(nextProps.meta.get('eq').toArray().map((band) => {
        var filter = this.ws.backend.ac.createBiquadFilter();

        filter.type = band.get('filterType');
        filter.gain.value = band.get('gain');
        filter.Q.value = band.get('Q');
        filter.frequency.value = band.get('frequency');

        return filter;
      }.bind(this)));

      this.state.eqInit = true;

      return;
    }

    //control state

    if (nextProps.meta.get('isPlaying')) {
      if (this.state.region) {
        this.seekToRegion(this.state.region);

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

      if (nextProps.meta.get('startPosition') && nextProps.meta.get('endPosition')) {
        this.ws.seekTo(nextProps.meta.get('startPosition') / this.ws.getDuration());
      }
      else {
        this.ws.seekTo(0);
      }
    }
    else if (nextProps.meta.get('isPaused')) {
      this.ws.pause();
    }
  }

  bindEvents() {
    this.ws.on('ready', this.onReady.bind(this));
    this.ws.on('finish', this.onFinish.bind(this));
    this.ws.on('region-update-end', this.onRegionUpdated.bind(this));
  }

  onReady() {
    this.props.trackActions.hasLoaded(this.props.track.id);

    //region

    if (this.props.meta.get('startPosition') && this.props.meta.get('endPosition')) {
      var Region = this.ws.addRegion({
        start: this.props.meta.get('startPosition'),
        end: this.props.meta.get('endPosition'),
        color: this.props.sampler.dragOptions.color
      });

      this.onRegionOut(Region);
      this.seekToRegion(Region);

      this.state.region = Region;
    }
  }

  onFinish() {
    this.props.trackActions.stop(this.props.track.id);

    if (this.props.meta.get('isLooped')) {
      this.props.trackActions.play(this.props.track.id);
    }
  }

  onRegionUpdated(Region, e) {
    if (this.state.region && e.toElement.className !== 'wavesurfer-region') {
      this.state.region.remove();
    }

    this.state.region = Region;

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
      if (!this.props.meta.get('isLooped')) {
        this.props.trackActions.stop(this.props.track.id);
      }
      else {
        this.ws.seekTo(this.props.meta.get('startPosition') / this.ws.getDuration())
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

    if (this.props.meta.get('hasLoaded')) {
      controls = <SetEditorSamplerControls track={this.props.track} meta={this.props.meta} />;
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

SetEditorSampler.propTypes = {
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
})(SetEditorSampler);
