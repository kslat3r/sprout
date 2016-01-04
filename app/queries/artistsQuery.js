var Marty = require('marty');
var ArtistsConstants = require('../constants/artistsConstants');
var ArtistsAPI = require('../sources/artistsAPI');

var ArtistsQuery = Marty.createActionCreators({
  id: 'ArtistsQuery',
  getById(id) {
    return ArtistsAPI.for(this).getById(id)
      .then((res) => this.dispatch(ArtistsConstants.RECEIVE_ARTISTS, res.body, id))
      .catch((err) => this.dispatch(ArtistsConstants.RECEIVE_ARTISTS_FAILED, err, id));
  }
});

module.exports = ArtistsQuery;