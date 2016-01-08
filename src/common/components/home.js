var React = require('react');

module.exports = React.createClass({
  render() {
    var loginUrl = this.props.config.apiUrl + '/auth/login';

    return (
      <div className="home">
        <a href={loginUrl} className="btn btn-success" role="button">Log In</a>
      </div>
    );
  }
});