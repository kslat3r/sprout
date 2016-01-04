var Marty = require('marty');

var ArtistsAPI = Marty.createStateSource({
  type: 'http',
  id: 'ArtistsAPI',
  getById(id) {
    return this.get('/api/artists/' + id);
  },
  getAll(id) {
    return this.get('/api/artists');
  }
});

module.exports = ArtistsAPI;