var _ = require('lodash');
var Marty = require('marty');
var SearchQuery = require('../queries/searchQuery');
var SearchConstants = require('../constants/searchConstants');

module.exports = Marty.createStore({
  id: 'SearchStore',

  handlers: {
    reset: SearchConstants.RESET,
    search: SearchConstants.SEARCH,
    searchFetch: SearchConstants.SEARCH_FETCH,
    searchFetchFailed: SearchConstants.SEARCH_FETCH_FAILED
  },

  getInitialState() {
    return {
      albums: [],
      artists: [],
      tracks: [],
      numResults: 0
    };
  },

  search(params) {
    return this.fetch({
      id: 'search',

      locally() {
        if (this.state.numResults) {
          return this.state
        }
      },

      remotely() {
        return SearchQuery.for(this).search(params);
      }
    });
  },

  searchFetch(results) {
    this.replaceState(results);
  },

  searchFetchFailed() {
    this.replaceState(this.getInitialSate());
  },

  reset: function() {
    this.clear();
  }
});