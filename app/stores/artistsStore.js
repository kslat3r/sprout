var _ = require('lodash');
var Marty = require('marty');
var ArtistsQuery = require('../queries/artistsQuery');
var ArtistsConstants = require('../constants/artistsConstants');

var ArtistsStore = Marty.createStore({
  id: 'ArtistsStore',
  handlers: {
    addArtists: ArtistsConstants.RECEIVE_ARTISTS
  },
  getInitialState() {
    return {};
  },
  getAll() {
    return _.values(this.state);
  },
  addArtists(artists) {
    this.state[artists.id] = artists;
    this.hasChanged();
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
  }
});

module.exports = ArtistsStore;