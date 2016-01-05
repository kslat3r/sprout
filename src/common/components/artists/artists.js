var _ = require('lodash');
var React = require('react');

var NavigationActionCreators = require('../../actions/navigationActionCreators');

module.exports = React.createClass({
  navigateToArtist(id, e) {
    e.preventDefault();

    return NavigationActionCreators.navigateToArtist(id);
  },

  render() {
    var artists = this.props.artists;

    var items = _.map(artists, (artist) => {
      return (
        <li>
          <a href="#" onClick={this.navigateToArtist.bind(this, artist.id)}>{artist.name}</a>
        </li>
      );
    });

    return (
      <div>
        <h1>Artists</h1>
        <div className='artists'>
          <ul>{items}</ul>
        </div>
      </div>
    );
  }
});