import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import SetEditorFiltersControls from './filtersControls';

class SetEditorFilters extends Component {
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

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    var filters = this.props.meta.filters.map((filter) => {
      return {
        frequency: filter.frequency.value,
        type: filter.type,
        value: filter.gain.value
      };
    });

    this.state.updateTimeout = setTimeout(() => this.props.trackActions.updateInSet.apply(this, [this.props.track.id, {filters}]), 500);
    this.props.trackActions.setFilters(this.props.track.id, this.props.meta.filters);

    this.forceUpdate();
  }

  render() {
    var filters;

    if (this.state.shown) {
      filters = (
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
              <SetEditorFiltersControls track={this.props.track} meta={this.props.meta} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="filters">
        <div className="toggle-handler" onClick={this.toggleShown}>
          Filters
        </div>
        {filters}
      </div>
    );
  }
}

SetEditorFilters.propTypes = {
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
})(SetEditorFilters);