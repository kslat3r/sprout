var React = require('react');
var Marty = require('marty');
var ArtistsStore = require('../stores/artistsStore');
var NavigationActionCreators = require('../actions/navigationActionCreators');

var Artist = React.createClass({
  back(e) {
    e.preventDefault();

    return NavigationActionCreators.navigateHome();
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

module.exports = Marty.createContainer(Artist, {
  listenTo: [ArtistsStore],

  fetch: {
    artist() {
      return ArtistsStore.for(this).getById(this.props.id);
    }
  },

  pending() {
    return <div className='loading'>Loading</div>;
  },

  failed(error) {
    return <div className='error'>{error}</div>;
  }
});