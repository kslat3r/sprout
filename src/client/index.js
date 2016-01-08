var React = require('react');
var Marty = require('marty');
var Router = require('../common/router');

var ConfigStore = require('../common/stores/configStore');
var AuthStore = require('../common/stores/authStore');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

Marty.rehydrate();

Router.run(function(Handler, state) {
  ConfigStore.set(window.initialData.config);
  AuthStore.set(window.initialData.auth);

  React.render(<Handler {...state.params} />, document.getElementById('app'));
});