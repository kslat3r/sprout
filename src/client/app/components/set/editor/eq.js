import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import SetEditorEQControls from './eqControls';

class SetEditorEQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateTimeout: null,
      shown: false
    };

    this.toggleShown = this.toggleShown.bind(this);
  }

  toggleShown() {
    this.setState({
      shown: !this.state.shown
    });
  }

  onFilterChange(filter, index, e) {
    this.props.meta.filters[index].gain.value = ~~e.target.value;
    this.forceUpdate();

    this.props.trackActions.setFilters(this.props.track.id, this.props.meta.filters);

    var eq = {};
    eq[filter.frequency.value] = filter.gain.value;

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {eq}]), 500);
  }

  render() {
    var eq;

    if (this.state.shown) {
      eq = (
        <div className="m-t-20 m-b-20">
          <div className="row vertical-center">
            <div className="col-xs-11">
              {this.props.meta.filters.map((filter, i) => {
                return (
                  <div className="col-xs-1 filter" key={i}>
                    <span>{filter.frequency.value}</span>
                    <input type="range" min="-40" max="40" value={filter.gain.value} title={filter.frequency.value} orient="vertical" onChange={this.onFilterChange.bind(this, filter, i)} />
                    <span>{filter.gain.value}</span>
                  </div>
                );
              }.bind(this))}
            </div>
            <div className="col-xs-1">
              <SetEditorEQControls track={this.props.track} meta={this.props.meta} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="eq">
        <div className="toggle-handler" onClick={this.toggleShown}>
          Equaliser
        </div>
        {eq}
      </div>
    );
  }
}

SetEditorEQ.propTypes = {
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
})(SetEditorEQ);