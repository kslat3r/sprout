var Marty = require('marty');
var ArtistsConstants = require('../constants/artistsConstants');

var ArtistsActionCreators = Marty.createActionCreators({
  id: 'ArtistsActionCreators',
  displayName: 'Artists',

  getArtists() {
    this.dispatch(ArtistsConstants.RECEIVE_ARTISTS);
  }
});

module.exports = ArtistsActionCreators;