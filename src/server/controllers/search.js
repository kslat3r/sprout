module.exports = {
  index: function(req, res) {
    res.send({
      artists: [{
        id: 1
      }],
      albums: [{
        id: 1
      }],
      tracks: [{
        id: 1
      }],
      length: 3
    })
  }
};