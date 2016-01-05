var Marty = require('marty');

var ArtistsAPI = Marty.createStateSource({
  type: 'http',
  id: 'ArtistsAPI',

  getAll(id) {
    return this.get('/api/artists');
  },

  getById(id) {
    return this.get('/api/artists/' + id);
  }
});

module.exports = ArtistsAPI;