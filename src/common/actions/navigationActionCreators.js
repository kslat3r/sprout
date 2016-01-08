var Marty = require('marty');

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

var NavigationActionCreators = Marty.createActionCreators({
  id: 'NavigationActionCreators',

  navigateHome() {
    navigateTo('home');
  },

  navigateToLogin() {
    navigateTo('login');
  },

  navigateToArtists() {
    navigateTo('artists');
  },

  navigateToArtist(id) {
    navigateTo('artist', {id: id});
  }
});

module.exports = NavigationActionCreators;