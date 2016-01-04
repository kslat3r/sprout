var React = require('react');
var Marty = require('marty');
var ArtistsStore = require('../stores/artistsStore');
var _ = require('lodash');

var Artists = React.createClass({
  render() {
    var artists = this.props.artists;

    var items = _.map(artists, (artist) => {
      return <li><a href={'/artists/' + artist.id}>{artist.id}</a></li>;
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

module.exports = Marty.createContainer(Artists, {
  listenTo: [ArtistsStore],

  fetch: {
    artists() {
      return ArtistsStore.for(this).getAll();
    }
  },

  pending() {
    return <div className='loading'>Loading</div>;
  },

  failed(error) {
    return <div className='error'>{error}</div>;
  }
});