//redux

import { compose, applyMiddleware, createStore } from 'redux'

//middleware

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

//router

import { reduxReactRouter } from 'redux-router';
import routes from './routes';
import { createHistory } from 'history';

//reducers

import reducers from './reducers';

//create store

const createStoreWithMiddleware = compose(
  applyMiddleware(createLogger()),
  applyMiddleware(thunk),
  reduxReactRouter({routes, createHistory})
)(createStore);

export default createStoreWithMiddleware(reducers, window.initialData);