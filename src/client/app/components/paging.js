import React, { Component } from 'react';

export default class Paging extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <button type="button" className="btn btn-primary btn-lg btn-block">Load more</button>
        </div>
      </div>
    );
  }
};