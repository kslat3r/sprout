export function bindEffectsToAudioContext(props) {
  if (!this.state) {
    this.state = {};
  }

  var filters = [];

  //panner

  if (!this.state.panner) {
    this.state.panner = this.ws.backend.ac.createPanner();
  }

  if (props.meta.getIn(['sample', 'pan']) !== 0) {
    var x = Math.sin(parseInt(props.meta.getIn(['sample', 'pan'])) * (Math.PI / 180));

    this.state.panner.setPosition(x, 0, 0);

    if (x !== 0) {
      filters.push(this.state.panner);
    }
  }

  //volume

  this.ws.setVolume(props.meta.getIn(['sample', 'volume']) / 100);

  //eq

  if (!props.meta.getIn(['sample', 'eq', 'bypass'])) {
    props.meta.getIn(['sample', 'eq', 'filters']).toArray().forEach((band) => {
      var filter = this.ws.backend.ac.createBiquadFilter();

      filter.type = band.get('filterType');
      filter.gain.value = band.get('gain');
      filter.Q.value = band.get('Q');
      filter.frequency.value = band.get('frequency');

      filters.push(filter);
    });
  }

  //compressor

  if (!props.meta.getIn(['sample', 'compressor', 'bypass'])) {
    var compressor = this.ws.backend.ac.createDynamicsCompressor();

    Object.keys(props.meta.getIn(['sample', 'compressor']).toObject()).map((key) => {
      if (key !== 'bypass') {
        compressor[key].value = props.meta.getIn(['sample', 'compressor', key]);
      }
    });

    filters.push(compressor);
  }

  //add to ws

  if (this.state.setFiltersTimeout) {
    clearTimeout(this.state.setFiltersTimeout);
  }

  this.state.setFiltersTimeout = setTimeout(() => this.ws.backend.setFilters.apply(this.ws.backend, [filters]), 100);
  return;
};
