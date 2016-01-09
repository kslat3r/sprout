var Marty = require('marty');

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

module.exports = Marty.createActionCreators({
  id: 'NavigationActionCreators',

  goToHome() {
    navigateTo('home');
  },

  goToDashboard() {
    navigateTo('dashboard')
  }
});