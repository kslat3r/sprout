var Marty = require('marty');
var ArtistConstants = require('../constants/artistConstants');
var ArtistAPI = require('../sources/artistAPI');

var ArtistQuery = Marty.createActionCreators({
  id: 'ArtistQuery',

  getById(id) {
    return ArtistAPI.for(this).getById(id)
      .then((res) => this.dispatch(ArtistConstants.RECEIVE_ARTIST, res.body))
      .catch((err) => this.dispatch(ArtistConstants.RECEIVE_ARTIST_FAILED, err));
  }
});

module.exports = ArtistQuery;