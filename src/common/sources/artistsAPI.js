var Marty = require('marty');
var ConfigStore = require('../stores/configStore');

var ArtistsAPI = Marty.createStateSource({
  id: 'ArtistsAPI',
  type: 'http',

  getAll(id) {
    return this.get(ConfigStore.get().apiUrl + '/artists');
  },

  getById(id) {
    return this.get(ConfigStore.get().apiUrl + '/artists/' + id);
  }
});

module.exports = ArtistsAPI;