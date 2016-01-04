var React = require('react');
var Marty = require('marty');
var ArtistStore = require('../stores/artistStore');

var Artist = React.createClass({
  render() {
    var artist = this.props.artist;

    return (
      <div>
        <h1>Artist</h1>
        <div className='artist'>{artist.id}</div>
      </div>
    );
  }
});

module.exports = Marty.createContainer(Artist, {
  listenTo: [ArtistStore],

  fetch: {
    artist() {
      return ArtistStore.for(this).getById(this.props.id);
    }
  },

  pending() {
    return <div className='loading'>Loading</div>;
  },

  failed(error) {
    return <div className='error'>{error}</div>;
  }
});