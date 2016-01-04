var Marty = require('marty');
var ArtistsConstants = require('../constants/artistsConstants');
var ArtistsAPI = require('../sources/artistsAPI');

var ArtistsQuery = Marty.createActionCreators({
  id: 'ArtistsQuery',

  getAll() {
    return ArtistsAPI.for(this).getAll()
      .then((res) => this.dispatch(ArtistsConstants.RECEIVE_ARTISTS, res.body))
      .catch((err) => this.dispatch(ArtistsConstants.RECEIVE_ARTISTS_FAILED, err));
  }
});

module.exports = ArtistsQuery;