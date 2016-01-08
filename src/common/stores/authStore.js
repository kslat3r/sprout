var Marty = require('marty');

var AuthStore = Marty.createStore({
  id: 'AuthStore',

  getInitialState() {
    return {};
  },

  set(auth) {
    this.setState(auth);
  },

  get() {
    return this.state;
  },

  getUser() {
    return this.state.user;
  },

  isLoggedIn() {
    if (this.state.user && this.state.user.id) {
      return true;
    }

    return false;
  }
});

module.exports = AuthStore;