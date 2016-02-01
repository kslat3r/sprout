import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';

export default class SetEditorEffectControls extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  reset() {
    var newEffect = {};
    newEffect[this.props.effect] = _.cloneDeep(this.props.effects.default[this.props.effect]);
    newEffect[this.props.effect].bypass = this.props.meta.effects[this.props.effect].bypass;

    var newEffects = _.extend(this.props.meta.effects, newEffect);

    this.props.trackActions.updateInSet(this.props.track.id, {effects: newEffects});
    this.props.trackActions.setEffects(this.props.track.id, newEffects);
  }

  render() {
    return (
      <div className="controls">
        <div className="row">
          <span className="reset">
            <a href="#" onClick={this.reset}>
              <i className="fa fa-eraser" />
            </a>
          </span>
        </div>
      </div>
    );
  }
}

SetEditorEffectControls.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  effect: PropTypes.string.isRequired
};

export default connect(function(state) {
  return {
    effects: state.get('effects')
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetEditorEffectControls);
