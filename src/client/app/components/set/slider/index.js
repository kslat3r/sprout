import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetSliderTrack from './track';

export default class SetSlider extends Component {
  render() {
    var items = this.props.set.result !== undefined ? this.props.set.result.tracks : this.props.set.tracks;
    var length = this.props.set.result !== undefined ? this.props.set.result.tracks.length : this.props.set.tracks.length;
    var meta;

    var itemWidth = 160;
    var innerStyle = {
      width: (itemWidth * length - 10) + 'px'
    };

    return (
      <div className="row set-slider">
        <div className="set-slider-outer">
          <div className="set-slider-inner" style={innerStyle}>
            {items.map((track, i) => {
              meta = this.props.set.meta !== undefined ? this.props.set.meta[track.id] : this.props.set.tracksMeta[track.id];

              return (
                <SetSliderTrack key={i} track={track} set={this.props.set} meta={meta} preview={this.props.preview} link={this.props.link} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

SetSlider.propTypes = {
  set: PropTypes.object.isRequired,
  preview: PropTypes.bool.isRequired,
  link: PropTypes.bool.isRequired
};
