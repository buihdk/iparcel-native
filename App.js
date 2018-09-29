import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { markers, loginInfo } from './utils/reducers';
import Main from './components/containers/Main';

const reducers = combineReducers({
  markers,
  loginInfo
});

const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>  
      </Provider>
    );
  }
}