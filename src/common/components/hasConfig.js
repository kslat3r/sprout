var React = require('react');
var ConfigStore = require('../stores/configStore');

module.exports = function(Component) {
  return React.createClass({
    getInitialState() {
      return {
        config: ConfigStore.get()
      };
    },

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  });
}