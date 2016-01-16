import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as SearchActions from '../actions/search';

export default class Paging extends Component {
  constructor() {
    this.click = this.click.bind(this);
  }

  click(e) {
    e.preventDefault();

    this.props.action({
      type: this.props.type,
      id: this.props.id,
      limit: this.props.limit,
      offset: this.props.offset + this.props.limit
    });
  }

  render() {
    if (this.props.total > this.props.length) {
      return (
        <div className="col-xs-12 col-md-4 col-md-offset-4 text-center paging">
          <button type="button" className="btn btn-block" onClick={this.click}>Load more</button>
        </div>
      );
    }

    return false;
  }
};

Paging.propTypes = {
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
};