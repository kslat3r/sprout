import React, { Component, PropTypes } from 'react';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state[this.props.type] = [];
  }

  render() {
    var title = this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);

    if (this.state[this.props.type].length) {
      return (
        <h1>{title} search results</h1>
      );
    }

    return false;
  }
};

SearchResults.propTypes = {
  type: PropTypes.string.isRequired
};