//https://shop.propellerheads.se/media/product/com.joshlevy.TickTick/pictures/p182ttre116ql13co1fbfte117mo3.jpg

import _ from 'lodash';
import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import * as commonSequencerModel from '../../../../../common/models/sequencer';

class SetSequencer extends Component {
  toggleStep(trackId, stepNum) {
    this.props.set.sequencer[trackId][stepNum] = !this.props.set.sequencer[trackId][stepNum];

    this.props.trackActions.setSequence(trackId, Immutable.fromJS(this.props.set.sequencer[trackId]));
    this.props.trackActions.updateSequencer(trackId, this.props.set.sequencer[trackId]);
  }

  render() {
    var tracks = this.props.set.result.tracks;
    var meta = this.props.set.meta;

    if (tracks && tracks.length && meta && Object.keys(meta).length) {
      var titles = _.range(1, commonSequencerModel.defaultBits + 1).map((i) => {
        return (
          <div className="item" key={i}>{i}</div>
        );
      });

      var names = _.keys(this.props.set.meta).map((trackId, i) => {
        var meta = this.props.set.meta[trackId];

        return (
          <div className="row" key={i}>
            <div>
              <span>{meta.name}</span>
            </div>
          </div>
        );
      });

      return (
        <div className="sequencer">
          <div className="names">
            {names}
          </div>
          <div className="editor">
            <div className="header">
              <div className="row">
                {titles}
              </div>
            </div>
            <div className="content">
              {_.keys(this.props.set.meta).map((trackId, i) => {
                var meta = this.props.set.meta[trackId];

                return (
                  <div className="row" key={i}>
                    {_.range(0, commonSequencerModel.defaultBits).map((stepNum) => {
                      var className = 'item step';

                      if (this.props.set.sequencer[trackId][stepNum]) {
                        className += ' on';
                      }

                      return <div key={stepNum} className={className} onClick={this.toggleStep.bind(this, trackId, stepNum)}></div>
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return false;
  }
};

SetSequencer.propTypes = {
  set: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {};
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
})(SetSequencer);
