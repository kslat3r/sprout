var React = require('react');
var Marty = require('marty');
var Router = require('../common/router');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

Marty.rehydrate();

Router.run((Handler, state) => {
  React.render(<Handler {...state.params} />, document.getElementById('app'));
});