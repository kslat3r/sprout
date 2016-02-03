import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';

class SetTrackVolume extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateTimeout: null
    };

    this.onVolumeChange = this.onVolumeChange.bind(this);
  }

  onVolumeChange(e) {
    var newVolumeState = this.props.meta.set('volume', e.target.value)

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {volume: newVolumeState.get('volume')}]), 500);
    this.props.trackActions.setVolume(this.props.track.id, newVolumeState.get('volume'));
  }

  render() {
    return (
      <div className="volume">
        <span>Volume</span>
        <input type="range" min="0" max="100" value={this.props.meta.get('volume')} title="Volume" orient="horizontal" onChange={this.onVolumeChange} />
        <span>{this.props.meta.get('volume')}</span>
      </div>
    );
  }
}

SetTrackVolume.propTypes = {
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
})(SetTrackVolume);
