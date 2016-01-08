var React = require('react');

module.exports = React.createClass({
  render() {
    var userId = this.props.user ? this.props.user.id : '';

    return (
      <div>
        <h1>Dashboard</h1>
        <h2>Welcome, {userId}</h2>
      </div>
    );
  }
});