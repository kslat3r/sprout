var React = require('react');

module.exports = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired
  },

  getInitialState() {
    var defaultState = {};
    defaultState[this.props.type] = [];

    return defaultState;
  },

  render() {
    var title = this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);

    if (this.state[this.props.type].length) {
      return (
        <h1>{title} search results</h1>
      );
    }

    return false;
  }
});