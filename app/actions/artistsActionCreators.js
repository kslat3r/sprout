var Marty = require('marty');
var ArtistsConstants = require('../constants/artistsConstants');

var ArtistsActionCreators = Marty.createActionCreators({
  id: 'ArtistsActionCreators',

  getArtists() {
    this.dispatch(ArtistsConstants.RECEIVE_ARTISTS);
  }
});

module.exports = ArtistsActionCreators;