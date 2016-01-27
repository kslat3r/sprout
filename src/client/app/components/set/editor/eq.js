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

  componentWillReceiveProps(newProps) {
    /*var eq = {};

    this.props.filters.forEach((filter, i) => {
      eq[filter.frequency.value] = filter.gain.value;
    });

    this.props.setActions.updateTrack({
      id: this.props.track.id,
      params: {
        eq
      }
    });*/
  }

  toggleShown() {
    this.setState({
      shown: !this.state.shown
    });
  }

  onFilterChange(filter, index, e) {
    /*filter.gain.value = ~~e.target.value;
    this.forceUpdate();

    var eq = {};
    eq[filter.frequency.value] = filter.gain.value;

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => {
      this.props.trackActions.updateInSet({
        id: this.props.track.id,
        params: {
          eq
        }
      });
    }.bind(this), 500);*/
  }

  render() {
    var eq;

    if (this.state.shown) {
      eq = (
        <div className="m-t-20 m-b-20">
          <div className="row vertical-center">
            <div className="col-xs-11">
              {/*this.props.filters.map((filter, i) => {
                return (
                  <div className="col-xs-1 filter" key={i}>
                    <span>{filter.frequency.value}</span>
                    <input type="range" min="-40" max="40" value={filter.gain.value} title={filter.frequency.value} orient="vertical" onChange={this.onFilterChange.bind(this, filter, i)} />
                    <span>{filter.gain.value}</span>
                  </div>
                );
              }.bind(this))*/}
            </div>
            <div className="col-xs-1">
              <SetEditorEQControls />
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
})(SetEditorEQ);