var React = require('react');
var NavigationActionCreators = require('../actions/navigationActionCreators');

var Home = React.createClass({
  navigateToArtists(e) {
    e.preventDefault();

    return NavigationActionCreators.navigateToArtists();
  },

  render: function() {
    return (
      <div className="home">
        <h1 ref="title">Sprout</h1>
        <ul>
          <li><a href="#" onClick={this.navigateToArtists}>Artists</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = Home;