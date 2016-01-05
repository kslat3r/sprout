var Marty = require('marty');

var ArtistsAPI = Marty.createStateSource({
  id: 'ArtistsAPI',
  type: 'http',
  baseUrl: 'http://localhost:5000/api',

  getAll(id) {
    return this.get('/artists');
  },

  getById(id) {
    return this.get('/artists/' + id);
  }
});

module.exports = ArtistsAPI;