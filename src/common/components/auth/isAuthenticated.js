var React = require('react');
var AuthStore = require('../../stores/authStore');
var NavigationActionCreators = require('../../actions/navigationActionCreators');

module.exports = function(Component) {
  return React.createClass({
    getInitialState() {
      return {
        user: AuthStore.getUser()
      };
    },

    componentDidMount() {
      if (!AuthStore.isLoggedIn()) {
        NavigationActionCreators.goToHome();
      }
    },

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  });
}