import { compose, applyMiddleware, createStore } from 'redux'
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import reducers from './reducers';

const compositedCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({routes, createHistory})
)(createStore);

export default compositedCreateStore(reducers, window.initialData);