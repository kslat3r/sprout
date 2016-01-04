var Marty = require('marty');
var ArtistConstants = require('../constants/artistsConstants');
var ArtistAPI = require('../sources/artistAPI');

var ArtistQuery = Marty.createActionCreators({
  id: 'ArtistQuery',

  getById(id) {
    return ArtistAPI.for(this).getById(id)
      .then((res) => this.dispatch(ArtistConstants.RECEIVE_ARTIST, id, res.body))
      .catch((err) => this.dispatch(ArtistConstants.RECEIVE_ARTIST_FAILED, id, err));
  }
});

module.exports = ArtistQuery;