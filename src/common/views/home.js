var Marty = require('marty');

var HasConfigComponent = require('../components/hasConfig');
var IsUnauthenticatedComponent = require('../components/auth/isUnauthenticated');
var HomeComponent = require('../components/home');

HomeComponent = HasConfigComponent(HomeComponent);
HomeComponent = IsUnauthenticatedComponent(HomeComponent);

module.exports = Marty.createContainer(HomeComponent);