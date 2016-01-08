var React = require('react');
var NavigationActionCreators = require('../actions/navigationActionCreators');

var Home = React.createClass({
  navigateToLogin(e) {
    e.preventDefault();

    return NavigationActionCreators.navigateToLogin();
  },

  render: function() {
    return (
      <div className="home">
        <h1 ref="title">Sprout</h1>
        <ul>
          <li><a href="#" onClick={this.navigateToLogin}>Log in</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = Home;