var Marty = require('marty');

var HasConfigComponent = require('../components/hasConfig');
var IsAuthenticatedComponent = require('../components/auth/isAuthenticated');
var DashboardComponent = require('../components/dashboard');

DashboardComponent = HasConfigComponent(DashboardComponent);
DashboardComponent = IsAuthenticatedComponent(DashboardComponent);

module.exports = Marty.createContainer(DashboardComponent);