var Marty = require('marty');
var ArtistsConstants = require('../constants/artistsConstants');

var ArtistsActionCreators = Marty.createActionCreators({
  id: 'ArtistsActionCreators',

  getArtists() {
    this.dispatch(ArtistsConstants.GET_ARTISTS);
  },

  getArtist(id) {
    this.dispatch(ArtistsConstants.GET_ARTIST, id);
  },

  resetArtists() {
    this.dispatch(ArtistsConstants.RESET_ARTISTS);
  }
});

module.exports = ArtistsActionCreators;