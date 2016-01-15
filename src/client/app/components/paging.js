import React, { Component } from 'react';

export default class Paging extends Component {
  render() {
    return (
      <div className="row paging">
        <div className="col-xs-12 col-md-4 col-md-offset-4 text-center">
          <button type="button" className="btn btn-block">Load more</button>
        </div>
      </div>
    );
  }
};