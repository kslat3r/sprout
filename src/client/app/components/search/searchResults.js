import React, { Component, PropTypes } from 'react';
import Preview from '../player/preview';

export default class SearchResults extends Component {
  render() {
    var title = this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);

    if (this.props.results.length) {
      return (
        <div>
          <h1>{title}</h1>
          <ul>
            {this.props.results.map(function(item, i) {
              return (
                <li key={i}>
                  {item.name}
                  {function() {
                    if (this.props.type === 'tracks') {
                      return <Preview item={item} />
                    }
                  }.call(this)}
                </li>
              );
            }.bind(this))}
          </ul>
        </div>
      );
    }

    return false;
  }
};

SearchResults.propTypes = {
  type: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired
};