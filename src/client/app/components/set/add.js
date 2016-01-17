import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AddControlActions from '../../actions/addControl';
import AddControl from './addControl';

class Add extends Component {
  constructor() {
    this.toggleControl = this.toggleControl.bind(this);
  }

  toggleControl(e) {
    e.preventDefault();

    if (this.props.addControl.track.id !== this.props.track.id) {
      this.props.addControlActions.open({
        track: this.props.track
      });
    }
    else {
      this.props.addControlActions.reset();
    }
  }

  render() {
    var addControl;
    var className;

    if (this.props.addControl.track.id === this.props.track.id) {
      addControl = <AddControl track={this.props.track} />
      className = 'open';
    }

    return (
      <div className="add-control">
        <a href="#" onClick={this.toggleControl} className={className}>
          <i className="fa fa-plus" />
        </a>
        {addControl}
      </div>
    );
  }
};

Add.propTypes = {
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    addControl: state.addControl
  };
}, function(dispatch) {
  return {
    addControlActions: bindActionCreators(AddControlActions, dispatch)
  };
})(Add);