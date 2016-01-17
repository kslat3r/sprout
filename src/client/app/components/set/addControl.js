import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AddControlActions from '../../actions/addControl';
import * as SetActions from '../../actions/set';

class AddControl extends Component {
  constructor() {
    this.state = {
      existingSet: null,
      newSetName: ''
    };

    this.setNewSetName = this.setNewSetName.bind(this);
    this.addToExistingSet = this.addToExistingSet.bind(this);
    this.addToNewSet = this.addToNewSet.bind(this);
  }

  setNewSetName(e) {
    this.setState({
      newSetName: e.target.value
    });
  }

  addToExistingSet(e) {
    e.preventDefault();

    if (this.state.existingSet !== null) {
      this.props.setActions.addToExistingSet({
        track: this.props.track,
        set: this.state.existingSet
      });

      this.props.addControlActions.reset();
    }
  }

  addToNewSet(e) {
    e.preventDefault();

    if (this.state.newSetName !== '') {
      this.props.setActions.addToNewSet({
        track: this.props.track,
        setName: this.state.newSetName
      });

      this.props.addControlActions.reset();
    }
  }

  render() {
    return (
      <div className="container">
        <form className="form-inline">
          <div className="form-group">
            <select className="form-control">
              <option disabled>Add to an existing set</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.addToExistingSet}>OK</button>
        </form>
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Add to a new set" value={this.state.newSetName} onChange={this.setNewSetName} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.addToNewSet}>OK</button>
        </form>
      </div>
    )
  }
};

AddControl.propTypes = {
  track: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {};
}, function(dispatch) {
  return {
    addControlActions: bindActionCreators(AddControlActions, dispatch),
    setActions: bindActionCreators(SetActions, dispatch)
  };
})(AddControl);