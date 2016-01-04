var _ = require('lodash');
var Marty = require('marty');
var ArtistsQuery = require('../queries/artistsQuery');
var ArtistsConstants = require('../constants/artistsConstants');

var ArtistsStore = Marty.createStore({
  id: 'ArtistsStore',

  handlers: {
    returnedArtists: ArtistsConstants.RECEIVE_ARTISTS
  },

  getInitialState() {
    return {};
  },

  getAll() {
    return this.fetch({
      id: 'artists',

      locally() {
        var vals = _.values(this.state);

        if (vals.length) {
          return vals;
        }

        return undefined;
      },

      remotely() {
        return ArtistsQuery.for(this).getAll();
      }
    });
  },

  returnedArtists(artists) {
    this.setState(artists);
  }
});

module.exports = ArtistsStore;