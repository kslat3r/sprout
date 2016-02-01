import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AddControlActions from '../../actions/addControl';
import * as TrackActions from '../../actions/track';

class AddControl extends Component {
  constructor() {
    this.state = {
      existingSetId: 0,
      newSetName: ''
    };

    this.setExistingSetId = this.setExistingSetId.bind(this);
    this.setNewSetName = this.setNewSetName.bind(this);
    this.addToExistingSet = this.addToExistingSet.bind(this);
    this.addToNewSet = this.addToNewSet.bind(this);
  }

  setExistingSetId(e) {
    if (e.target.value !== '0') {
      this.setState({
        existingSetId: e.target.value
      });
    }
  }

  setNewSetName(e) {
    this.setState({
      newSetName: e.target.value
    });
  }

  addToExistingSet(e) {
    e.preventDefault();

    if (this.state.existingSet !== null) {
      this.props.trackActions.addToExistingSet({
        track: this.props.track,
        id: this.state.existingSetId
      });

      this.props.addControlActions.reset();
    }
  }

  addToNewSet(e) {
    e.preventDefault();

    if (this.state.newSetName !== '') {
      this.props.trackActions.addToNewSet({
        track: this.props.track,
        name: this.state.newSetName
      });

      this.props.addControlActions.reset();
    }
  }

  render() {
    var addToExistingForm

    if (this.props.sets.results.length) {
      var options = this.props.sets.results.map(function(set, i) {
        return <option value={set._id} key={i}>{set.name}</option>;
      });

      var addToExistingForm = (
        <form className="form-inline">
          <div className="form-group">
            <select className="form-control" defaultValue={0} onChange={this.setExistingSetId}>
              <option disabled value={0}>Add to an existing set</option>
              {options}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.addToExistingSet}>OK</button>
        </form>
      );
    }

    return (
      <div className="container">
        {addToExistingForm}
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Add to a new set" value={this.state.newSetName} onChange={this.setNewSetName} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.addToNewSet}>OK</button>
        </form>
      </div>
    );
  }
};

AddControl.propTypes = {
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    sets: state.get('sets').toJS()
  };
}, function(dispatch) {
  return {
    addControlActions: bindActionCreators(AddControlActions, dispatch),
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
})(AddControl);
