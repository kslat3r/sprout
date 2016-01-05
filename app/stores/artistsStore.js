var _ = require('lodash');
var Marty = require('marty');
var ArtistsQuery = require('../queries/artistsQuery');
var ArtistsConstants = require('../constants/artistsConstants');

var ArtistsStore = Marty.createStore({
  id: 'ArtistsStore',

  handlers: {
    returnedArtists: ArtistsConstants.RECEIVE_ARTISTS,
    returnedArtist: ArtistsConstants.RECEIVE_ARTIST
  },

  getInitialState() {
    return {};
  },

  getAll() {
    return this.fetch({
      id: 'artists',

      locally() {
        var artists = _.values(this.state);

        if (artists.length) {
          return artists;
        }

        return undefined;
      },

      remotely() {
        return ArtistsQuery.for(this).getAll();
      }
    });
  },

  getById(id) {
    return this.fetch({
      id: id,

      locally() {
        return this.state[id];
      },

      remotely() {
        return ArtistsQuery.for(this).getById(id);
      }
    });
  },

  returnedArtists(artists) {
    _.each(artists, function(artist) {
      this.state[artist.id] = artist;
    }.bind(this));

    this.hasChanged();
  },

  returnedArtist(artist) {
    this.state[artist.id] = artist;

    this.hasChanged();
  }
});

module.exports = ArtistsStore;