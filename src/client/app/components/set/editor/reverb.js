import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SetActions from '../../../actions/set';
import SetEditorReverbControls from './reverbControls';

class SetEditorReverb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false
    };

    this.toggleShown = this.toggleShown.bind(this);
  }

  toggleShown() {
    this.setState({
      shown: !this.state.shown
    });
  }

  render() {
    var reverb;

    if (this.state.shown) {
      reverb = (
        <div className="reverb m-t-20 m-b-20 vertical-center">
          <div className="col-xs-11">
            Reverb
          </div>
          <div className="col-xs-1">
            <SetEditorReverbControls resetReverb={this.props.resetReverb} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="toggle-handler" onClick={this.toggleShown}>
          Reverb
        </div>
        {reverb}
      </div>
    );
  }
}

SetEditorReverb.propTypes = {
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
})(SetEditorReverb);