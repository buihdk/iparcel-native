import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { markers, loginInfo } from './utils/reducers';
import ListContainer from './components/containers/ListContainer';

jest.mock('./utils/firebase', () => ({ db: {} }));
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  onValue: jest.fn(() => jest.fn()),
  push: jest.fn()
}));

describe('markers reducer', () => {
  const store = createStore(combineReducers({ markers }));

  it('starts empty', () => {
    expect(store.getState().markers.markers).toEqual([]);
  });

  it('stores loaded markers', () => {
    const list = [{ key: 'a', marker: { title: 'A', coordinate: { latitude: 1, longitude: 2 } } }];
    store.dispatch({ type: 'FINISH_LOADING_MARKERS', markers: list });
    expect(store.getState().markers.markers).toEqual(list);
  });
});

describe('ListContainer', () => {
  it('renders the search box', async () => {
    const store = createStore(combineReducers({ markers, loginInfo }), applyMiddleware(thunk));
    let tree;
    await act(async () => {
      tree = renderer.create(
        <Provider store={store}>
          <ListContainer />
        </Provider>
      );
    });
    expect(tree.root.findByProps({ placeholder: 'Search deliveries' })).toBeTruthy();
  });
});
