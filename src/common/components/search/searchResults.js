import React, { Component, PropTypes } from 'react';

export default class SearchResults extends Component {
  render() {
    var title = this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);

    if (this.props.results.length) {
      return (
        <h1>{title} search results</h1>
      );
    }

    return false;
  }
};

SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired
};