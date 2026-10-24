import React from 'react';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import { StatusBar } from 'expo-status-bar';
import { markers, loginInfo } from './utils/reducers';
import Tabs from './components/TabNavigator';

const reducers = combineReducers({
  markers,
  loginInfo
});

const middleware = __DEV__ ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

const store = createStore(reducers, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <Tabs />
      <StatusBar style="auto" />
    </Provider>
  );
}
