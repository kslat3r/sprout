var Marty = require('marty');
var Router = require('../router');

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

var NavigationActionCreators = Marty.createActionCreators({
  id: 'NavigationActionCreators',
  displayName: 'Navigation',
  navigateHome() {
    navigateTo('home');
  },
  navigateToArtists() {
    navigateTo('artists');
  },
  navigateToArtist: function (id) {
    navigateTo('artists', { id: id });
  }
});

module.exports = NavigationActionCreators;