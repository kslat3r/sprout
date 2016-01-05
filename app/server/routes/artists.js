var _ = require('lodash');

module.exports = {
  artists: [{
    id: 1,
    name: 'Sublime'
  },
  {
    id: 2,
    name: 'Kendrick Lamar'
  }],

  getAll: function(req, res) {
    res.json(this.artists).end();
  },

  getById: function(req, res) {
    var artist = _.find(this.artists, {id: req.params.id});

    if (artist) {
      return res.json(artist).end();
    }

    res.status(404).send('Not found');
  }
};