import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetActions from '../../../actions/set';
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
    var eq = {};

    this.props.filters.forEach((filter, i) => {
      eq[filter.frequency.value] = filter.gain.value;
    });

    this.props.setActions.updateTrack({
      id: this.props.track.id,
      params: {
        eq
      }
    });
  }

  onFilterChange(filter, index, e) {
    filter.gain.value = ~~e.target.value;
    this.forceUpdate();

    var eq = {}
    eq[filter.frequency.value] = filter.gain.value;

    if (this.state.updateTimeout) {
      clearInterval(this.state.updateTimeout);
    }

    this.state.updateTimeout = setTimeout(() => {
      this.props.setActions.updateTrack({
        id: this.props.track.id,
        params: {
          eq
        }
      });
    }.bind(this), 500);
  }

  toggleShown() {
    this.setState({
      shown: !this.state.shown
    });
  }

  render() {
    var eq;

    if (this.state.shown) {
      eq = (
        <div className="eq m-t-20 m-b-20 vertical-center">
          <div className="col-xs-11">
            {this.props.filters.map((filter, i) => {
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
            <SetEditorEQControls resetEQ={this.props.resetEQ} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="toggle-handler" onClick={this.toggleShown}>
          Equaliser
        </div>
        {eq}
      </div>
    );
  }
}

SetEditorEQ.propTypes = {
  filters: PropTypes.array.isRequired,
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch)
  };
})(SetEditorEQ);