var Marty = require('marty');
var ArtistsConstants = require('../constants/artistsConstants');
var ArtistsAPI = require('../sources/artistsAPI');

var ArtistsQuery = Marty.createActionCreators({
  id: 'ArtistsQuery',

  getAll() {
    return ArtistsAPI.for(this).getAll()
      .then((res) => this.dispatch(ArtistsConstants.GET_ARTISTS, res.body))
      .catch((err) => this.dispatch(ArtistsConstants.GET_ARTISTS_FAILED, err));
  },

  getById(id) {
    return ArtistsAPI.for(this).getById(id)
      .then((res) => this.dispatch(ArtistsConstants.GET_ARTIST, res.body))
      .catch((err) => this.dispatch(ArtistsConstants.GET_ARTIST_FAILED, err));
  }
});

module.exports = ArtistsQuery;