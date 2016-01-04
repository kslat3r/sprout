var Marty = require('marty');
var ArtistConstants = require('../constants/artistConstants');

var ArtistActionCreators = Marty.createActionCreators({
  id: 'ArtistActionCreators',

  getArtist(id) {
    this.dispatch(ArtistConstants.RECEIVE_ARTIST, id);
  }
});

module.exports = ArtistsActionCreators;