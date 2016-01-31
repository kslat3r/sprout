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
      shown: false,
      files: [

      ]
    };

    this.toggleShown = this.toggleShown.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onGainChange = this.onGainChange.bind(this);
  }

  toggleShown() {
    this.setState({
      shown: !this.state.shown
    });
  }

  onFileChange(e) {

  }

  onGainChange(e) {

  }

  render() {
    var reverb;

    if (this.state.shown) {
      reverb = (
        <div className="row vertical-center m-t-20 m-b-20">
          <div className="col-xs-3 col-xs-push-4">
            <select onChange={this.onFileChange}>
              <option disabled value={null}>Select reverb file</option>
              {this.state.files.map((file, i) => {
                return <option value={file} key={i}>{file}</option>;
              })}
            </select>
          </div>
          <div className="col-xs-3 col-xs-push-3">
            <span>Gain</span>
            <input type="range" min={0} max={100} value={this.props.meta.reverb.gain} title="Gain" orient="vertical" onChange={this.onGainChange} />
            <span>{this.props.meta.reverb.gain}</span>
          </div>
          <div className="col-xs-1 col-xs-push-5">
            <SetEditorReverbControls track={this.props.track} meta={this.props.meta} />
          </div>
        </div>
      );
    }

    return (
      <div className="reverb">
        <div className="toggle-handler" onClick={this.toggleShown}>
          Reverb
        </div>
        {reverb}
      </div>
    );
  }
}

SetEditorReverb.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
  };
}, function(dispatch) {
  return {
    setActions: bindActionCreators(SetActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetEditorReverb);
