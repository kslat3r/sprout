module.exports = function() {
  return function(req, res, next) {
    if (req.user) {
      console.log(true);
    }

    next();
  };
};