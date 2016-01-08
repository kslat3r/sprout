var React = require('react');
var AuthStore = require('../../stores/authStore');
var NavigationActionCreators = require('../../actions/navigationActionCreators');

module.exports = function(Component) {
  return React.createClass({
    getInitialState() {
      return {
        user: undefined
      };
    },

    componentDidMount() {
      if (AuthStore.isLoggedIn()) {
        NavigationActionCreators.goToDashboard();
      }
    },

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  });
}