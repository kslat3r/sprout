import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SetSequencer extends Component {
  render() {
    return (
      <div className="sequencer">
        <h2>Sequencer</h2>
      </div>
    );
  }
};

SetSequencer.propTypes = {
  set: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {};
})(SetSequencer);
