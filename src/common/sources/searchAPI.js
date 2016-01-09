var Marty = require('marty');
var ConfigStore = require('../stores/configStore');

module.exports = Marty.createStateSource({
  id: 'SearchAPI',
  type: 'http',

  search(params) {
    return this.get(ConfigStore.get().apiUrl + '/search?term=' + params.searchTerm);
  }
});