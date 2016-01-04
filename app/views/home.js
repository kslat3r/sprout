var React = require('react');

var Home = React.createClass({
  render: function () {
    return (
      <div className="home">
        <h1 ref="title">Hello world</h1>
      </div>
    );
  }
});

module.exports = Home;