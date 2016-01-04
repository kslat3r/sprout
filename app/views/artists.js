var React = require('react');
var Marty = require('marty');
var ArtistsStore = require('../stores/artistsStore');

var Artists = React.createClass({
  render() {
    var artists = this.props.artists;

    return <div className='artists'>{artists}</div>;
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