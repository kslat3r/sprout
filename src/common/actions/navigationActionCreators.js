var Marty = require('marty');

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

var NavigationActionCreators = Marty.createActionCreators({
  id: 'NavigationActionCreators',

  goToHome() {
    navigateTo('home');
  },

  goToDashboard() {
    navigateTo('dashboard')
  }
});

module.exports = NavigationActionCreators;