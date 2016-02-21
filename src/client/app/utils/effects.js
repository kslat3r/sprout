import Immutable from 'immutable';

export function bindEffectsToAudioContext(props) {
  if (!this.state) {
    this.state = {};
  }

  var effectsProps;

  if (!props.meta.get('sample')) {
    effectsProps = props.meta.toJS();
  }
  else {
    effectsProps = props.meta.get('sample').toJS();
  }

  var filters = [];

  //panner

  if (!this.state.panner) {
    this.state.panner = this.ws.backend.ac.createPanner();
  }

  if (parseInt(effectsProps.pan) !== 0) {
    var x = Math.sin(parseInt(effectsProps.pan) * (Math.PI / 180));

    this.state.panner.setPosition(x, 0, 0);

    if (x !== 0) {
      filters.push(this.state.panner);
    }
  }

  //volume

  this.ws.setVolume(effectsProps.volume / 100);

  //eq

  if (!effectsProps.eq.bypass) {
    effectsProps.eq.filters.forEach((band) => {
      var filter = this.ws.backend.ac.createBiquadFilter();

      filter.type = band.filterType;
      filter.gain.value = band.gain;
      filter.Q.value = band.Q;
      filter.frequency.value = band.frequency;

      filters.push(filter);
    });
  }

  //compressor

  if (!effectsProps.compressor.bypass) {
    var compressor = this.ws.backend.ac.createDynamicsCompressor();

    Object.keys(effectsProps.compressor).map((key) => {
      if (key !== 'bypass') {
        compressor[key].value = effectsProps.compressor[key];
      }
    });

    filters.push(compressor);
  }

  //delay

  if (effectsProps.delay.bypass) {
    var delay = this.ws.backend.ac.createDelay();

    Object.keys(effectsProps.delay).map((key) => {
      if (key !== 'bypass') {
        delay[key].value = effectsProps.delay[key];
      }
    });

    filters.push(delay);
  }

  //add to ws

  if (this.state.setFiltersTimeout) {
    clearTimeout(this.state.setFiltersTimeout);
  }

  this.state.setFiltersTimeout = setTimeout(() => this.ws.backend.setFilters.apply(this.ws.backend, [filters]), 100);
  return;
};

export function resetEffectsOnAudioContext() {
  this.ws.backend.disconnectFilters.apply(this.ws.backend);
};
