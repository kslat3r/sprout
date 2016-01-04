var Marty = require('marty');

var ArtistAPI = Marty.createStateSource({
  type: 'http',
  id: 'ArtistAPI',

  getById(id) {
    return this.get('/api/artists/' + id);
  }
});

module.exports = ArtistAPI;