import _ from 'lodash';
import lodashInflection from 'lodash-inflection';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tuna from 'tunajs';
import * as TrackActions from '../../../actions/track';
import SetEditorSamplerControls from './samplerControls';

_.mixin(lodashInflection);

class SetEditorSampler extends Component {
  constructor(props) {
    super(props);

    if (WaveSurfer === undefined) {
      throw new Error('Wavesurfer is not defined');
    }

    this.ws = Object.create(WaveSurfer);
    this.tuna = null;

    this.state = {
      chorus: null,
      delay: null,
      phaser: null,
      overdrive: null,
      compressor: null,
      convolver: null,
      filters: null,
      tremolo: null,
      wahWah: null,
      bitcrusher: null,
      pingPongDelay: null
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

    //effects

    console.log(this.props.meta.effects.chorus);
    console.log(nextProps.meta.effects.chorus);

    if (this.tuna && !_.isEqual(this.props.meta.effects, nextProps.meta.effects)) {

      //single effects

      /*nextProps.effects.single.forEach((effect) => {
        if (!this.state[effect]) {
          if (!nextProps.meta.effects[effect].bypass) {
            this.state[effect] = new this.tuna[_.capitalize(effect)](nextProps.meta.effects[effect]);
          }
        }
        else {
          if (!nextProps.meta.effects[effect].bypass) {
            Object.keys(nextProps.meta.effects[effect]).forEach((key) => {
              this.state[effect][key] = nextProps.meta.effects[effect][key];
            }.bind(this));
          }
          else {
            this.state[effect].bypass = nextProps.meta.effects[effect].bypass;
          }
        }
      }.bind(this));*/

      //array effects

      /*nextProps.effects.multiple.forEach((effect) => {
        if (!this.state[effect]) {
          this.state[effect] = [];

          if (!nextProps.meta.effects[effect].bypass) {
            nextProps.meta.effects[effect].items.forEach((item) => {
              this.state[effect].push(new this.tuna[_.capitalize(_.singularize(effect))](item));
            }.bind(this));
          }
        }
        else {
          if (!nextProps.meta.effects[effect].bypass) {
            this.state[effect].forEach((item, i) => {
              Object.keys(nextProps.meta.effects[effect][i]).forEach((key) => {
                item[key] = nextProps.meta.effects[effect][i][key];
              });
            });
          }
          else {
            this.state[effect].forEach((item, i) => {
              item.bypass = nextProps.meta.effects[effect].bypass;
            });
          }
        }
      }.bind(this));*/

      return;
    }

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
    this.props.trackActions.hasLoaded(this.props.track.id);

    //tuna

    this.tuna = new Tuna(this.ws.backend.ac);

    //region

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

    if (this.props.meta.hasLoaded) {
      controls = <SetEditorSamplerControls track={this.props.track} meta={this.props.meta} />;
    }

    if (!this.props.meta.hasLoaded) {
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
    effects: state.get('sampler').toJS(),
    effects: state.get('effects').toJS()
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetEditorSampler);
