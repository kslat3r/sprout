import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import SetTrackEQControls from './controls/eq';

class SetTrackEQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateTimeout: null
    };
  }

  onFilterChange(filter, index, e) {
    var newEQState = this.props.meta.setIn(['sample', 'eq', index, 'gain'], ~~e.target.value)

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {eq: newEQState.getIn(['sample', 'eq']).toJS()}]), 500);
    this.props.trackActions.setEQ(this.props.track.id, newEQState.getIn(['sample', 'eq']));
  }

  render() {
    return (
      <div className="eq">
        <div className="m-t-20 m-b-20">
          <div className="row vertical-center">
            <div className="col-xs-11">
              {this.props.meta.getIn(['sample', 'eq']).toArray().map((filter, i) => {
                return (
                  <div className="col-xs-1 filter" key={i}>
                    <span>{filter.get('frequency')}</span>
                    <input type="range" min="-40" max="40" value={filter.get('gain')} title={filter.get('frequency')} orient="vertical" onChange={this.onFilterChange.bind(this, filter, i)} />
                    <span>{filter.get('gain')}</span>
                  </div>
                );
              }.bind(this))}
            </div>
            <div className="col-xs-1">
              <SetTrackEQControls track={this.props.track} meta={this.props.meta} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SetTrackEQ.propTypes = {
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
})(SetTrackEQ);
