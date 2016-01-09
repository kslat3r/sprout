var Marty = require('marty');
var SearchConstants = require('../constants/searchConstants');
var SearchAPI = require('../sources/searchAPI');

module.exports = Marty.createActionCreators({
  id: 'SearchQuery',

  search(params) {
    return SearchAPI.for(this).search(params)
      .then((res) => this.dispatch(SearchConstants.SEARCH_FETCH, res.body))
      .catch((err) => this.dispatch(SearchConstants.SEARCH_FETCH_FAILED, err));
  }
});