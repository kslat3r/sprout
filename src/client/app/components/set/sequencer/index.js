//https://shop.propellerheads.se/media/product/com.joshlevy.TickTick/pictures/p182ttre116ql13co1fbfte117mo3.jpg

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SetSequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: 32
    };
  }

  toggleStep(trackId, stepNum) {
    console.log(trackId);
    console.log(stepNum);
  }

  render() {
    if (this.props.set.result.tracks.length && _.values(this.props.set.meta).length) {
      var titles = _.range(1, this.state.steps + 1).map((i) => {
        return (
          <th key={i}>{i}</th>
        );
      });

      return (
        <div className="sequencer">
          <table>
            <thead>
              <tr>
                <th>&nbsp;</th>
                {titles}
              </tr>
            </thead>
            <tbody>
              {_.keys(this.props.set.meta).map((key, i) => {
                var meta = this.props.set.meta[key];

                return (
                  <tr key={i}>
                    <td className="name">{meta.name}</td>
                    {_.range(1, this.state.steps + 1).map((j) => {
                      return <td key={j} className="step" onClick={this.toggleStep.bind(this, key, j)}></td>
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    return false;
  }
};

SetSequencer.propTypes = {
  set: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {};
})(SetSequencer);
