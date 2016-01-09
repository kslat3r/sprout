var React = require('react');
var SearchComponent = require('./search/search');

module.exports = React.createClass({
  render() {
    var userId = this.props.user ? this.props.user.id : '';

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1>{userId}'s Dashboard</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <SearchComponent />
          </div>
        </div>
      </div>
    );
  }
});