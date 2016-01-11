import React from 'react';
import { render } from 'react-dom';
import Root from './containers/root'
import Store from './store';

render(
  <Root store={Store} />,
  document.getElementById('app')
);