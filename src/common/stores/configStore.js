var Marty = require('marty');

var ConfigStore = Marty.createStore({
  id: 'ConfigStore',

  getInitialState() {
    return {};
  },

  set(config) {
    this.setState(config);
  },

  get() {
    return this.state;
  }
});

module.exports = ConfigStore;