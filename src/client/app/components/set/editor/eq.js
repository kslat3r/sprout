import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetActions from '../../../actions/set';

class SetEditorEQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateTimeout: null
    };
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

  render() {
    return (
      <div className="eq">
        {this.props.filters.map((filter, i) => {
          return (
            <div className="col-xs-1 filter" key={i}>
              <input type="range" min="-40" max="40" value={filter.gain.value} title={filter.frequency.value} orient="vertical" onChange={this.onFilterChange.bind(this, filter, i)} />
            </div>
          );
        }.bind(this))}
      </div>
    );
  }
}

SetEditorEQ.propTypes = {
  filters: PropTypes.array.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch)
  };
})(SetEditorEQ);