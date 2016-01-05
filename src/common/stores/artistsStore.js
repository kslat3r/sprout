var _ = require('lodash');
var Marty = require('marty');
var ArtistsQuery = require('../queries/artistsQuery');
var ArtistsConstants = require('../constants/artistsConstants');

var ArtistsStore = Marty.createStore({
  id: 'ArtistsStore',

  handlers: {
    artistsFetched: ArtistsConstants.GET_ARTISTS,
    artistFetched: ArtistsConstants.GET_ARTIST,
    reset: ArtistsConstants.RESET_ARTISTS
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

  artistsFetched(artists) {
    _.each(artists, function(artist) {
      this.state[artist.id] = artist;
    }.bind(this));

    this.hasChanged();
  },

  artistFetched(artist) {
    this.state[artist.id] = artist;

    this.hasChanged();
  },

  reset: function() {
    this.clear();
  }
});

module.exports = ArtistsStore;