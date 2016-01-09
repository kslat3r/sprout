var Marty = require('marty');
var SearchConstants = require('../constants/searchConstants');

module.exports = Marty.createActionCreators({
  id: 'SearchActionCreators',

  reset() {
    this.dispatch(SearchConstants.RESET);
  },

  search(params) {
    this.dispatch(SearchConstants.SEARCH, params);
  }
});