var React = require('react');

var NavigationActionCreators = require('../../actions/navigationActionCreators');

module.exports = React.createClass({
  back(e) {
    e.preventDefault();

    return NavigationActionCreators.navigateToArtists();
  },

  render() {
    var artist = this.props.artist;

    return (
      <div>
        <h1>Artist</h1>
        <div className='artist'>{artist.name}</div>
        <a href="#" onClick={this.back.bind(this)}>Back</a>
      </div>
    );
  }
});