import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import SetEditorCompressorControls from './compressorControls';

class SetEditorCompressor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false,
      updateTimeout: null,
      min: {
        knee: 0,
        ratio: 1,
        release: 0,
        attack: 0,
        threshold: -100
      },
      max: {
        knee: 40,
        ratio: 20,
        release: 1,
        attack: 1,
        threshold: 0
      },
      step: {
        knee: 1,
        ratio: 1,
        release: 0.001,
        attack: 0.001,
        threshold: 1
      }
    };

    this.toggleShown = this.toggleShown.bind(this);
  }

  toggleShown() {
    this.setState({
      shown: !this.state.shown
    });
  }

  onParamChange(key, e) {
    this.props.meta.compressor[key].value = e.target.value;

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    var compressor = {};

    ['knee', 'ratio', 'release', 'attack', 'threshold'].forEach((key) => {
      compressor[key] = this.props.meta.compressor[key].value;
    }.bind(this));

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {compressor}]), 500);
    this.props.trackActions.setCompressor(this.props.track.id, this.props.meta.compressor);

    this.forceUpdate();
  }

  render() {
    var compressor;

    if (this.state.shown) {
      compressor = (
        <div className="row vertical-center m-t-20 m-b-20">
          <div className="col-xs-11">
            {['threshold', 'knee', 'ratio', 'attack', 'release'].map((key, i) => {
              var className = 'col-xs-1 compressor-param ' + key;

              return (
                <div className={className} key={i}>
                  <span>{_.capitalize(key)}</span>
                  <input type="range" min={this.state.min[key]} max={this.state.max[key]} step={this.state.step[key]} value={this.props.meta.compressor[key].value} title={_.capitalize(key)} orient="vertical" onChange={this.onParamChange.bind(this, key)} />
                  <span>{this.props.meta.compressor[key].value.toPrecision(3)}</span>
                </div>
              );
            }.bind(this))}
          </div>
          <div className="col-xs-1">
            <SetEditorCompressorControls track={this.props.track} meta={this.props.meta} />
          </div>
        </div>
      );
    }

    return (
      <div className="compressor">
        <div className="toggle-handler" onClick={this.toggleShown}>
          Compressor
        </div>
        {compressor}
      </div>
    );
  }
}

SetEditorCompressor.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetEditorCompressor);