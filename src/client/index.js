import React from 'react';
import { render } from 'react-dom';
import Root from '../common/containers/root'
import Store from '../common/store';

render(
  <Root store={Store} />,
  document.getElementById('app')
);