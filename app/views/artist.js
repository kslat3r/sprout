var React = require('react');
var Marty = require('marty');
var ArtistsStore = require('../stores/artistsStore');

var Artist = React.createClass({
  render() {
    var artist = this.props.artist;

    return (
      <div>
        <h1>Artist</h1>
        <div className='artist'>{artist.name}</div>
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