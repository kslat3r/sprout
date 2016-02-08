function bindNewRegion(Region) {
  this.state.region = Region;

  onRegionOut.call(this, Region);
  seekToRegion.call(this, Region);
};

export function bindRegionToWaveform() {
  var Region = this.ws.addRegion({
    start: this.props.meta.getIn(['sample', 'startPosition']),
    end: this.props.meta.getIn(['sample', 'endPosition']),
    color: this.props.sampler.dragOptions.color
  });

  bindNewRegion.call(this, Region);
};

export function onRegionOut(Region) {
  Region.on('out', () => {
    if (!this.props.meta.get('isLooped')) {
      this.props.trackActions.stop(this.props.track.id);
    }
    else {
      this.ws.seekTo(this.props.meta.getIn(['sample', 'startPosition']) / this.ws.getDuration())
    }
  }.bind(this));
};

export function onRegionUpdated(Region, e) {
  if (this.state.region && e.toElement.className !== 'wavesurfer-region') {
    this.state.region.remove();
  }

  var regionParams = {
    startPosition: Region.start,
    endPosition: Region.end
  };

  this.props.trackActions.updateInSet(this.props.track.id, regionParams);
  this.props.trackActions.setRegion(this.props.track.id, regionParams);

  bindNewRegion.call(this, Region);
};

export function seekToRegion(Region) {
  setTimeout(() => {
    this.ws.seekTo(Region.start / this.ws.getDuration());
  }.bind(this), 10);
};

export function removeRegionFromWaveform() {
  if (this.state.region) {
    this.state.region.remove();
    this.state.region = null;
  }
};
