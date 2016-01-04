var Marty = require('marty');

var ArtistsAPI = Marty.createStateSource({
  type: 'http',
  id: 'ArtistsAPI',

  getAll(id) {
    return this.get('/api/artists');
  }
});

module.exports = ArtistsAPI;