var _ = require('lodash');
var Marty = require('marty');
var ArtistQuery = require('../queries/artistQuery');
var ArtistConstants = require('../constants/artistConstants');

var ArtistStore = Marty.createStore({
  id: 'ArtistStore',

  handlers: {
    returnedArtist: ArtistConstants.RECEIVE_ARTIST
  },

  getInitialState() {
    return {};
  },

  getById(id) {
    return this.fetch({
      id: id,

      locally() {
        return this.state[id];
      },

      remotely() {
        return ArtistQuery.for(this).getById(id);
      }
    });
  },

  returnedArtist(artist) {
    this.state[artist.id] = artist;

    this.hasChanged();
  }
});

module.exports = ArtistStore;