var _ = require('underscore');
var React = require('react');
var NavigationActionCreators = require('../actions/navigationActionCreators');

var Home = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: '',
      errors: []
    };
  },

  handleChange(key, e) {
    var nextState = {};

    nextState[key] = e.target.value;
    this.setState(nextState);
  },

  login(e) {
    e.preventDefault();

    var errors = [];

    if (this.state.email === '') {
      errors.push('Please enter an email address');
    }

    if (this.state.password === '') {
      errors.push('Please enter a password');
    }

    this.setState({errors: errors});

    if (errors.length) {
      return;
    }
  },

  render: function() {
    var errors = this.state.errors.map(function(msg) {
      return <li>{msg}</li>
    });

    if (errors.length) {
      var errorsContainer = (
        <div className="alert alert-danger" role="alert">
          <ul>
            {errors}
          </ul>
        </div>
      );
    }

    return (
      <div className="login">
        <form onSubmit={this.login.bind(this)}>
          {errorsContainer}
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange.bind(this, 'password')} />
          </div>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
      </div>
    );
  }
});

module.exports = Home;