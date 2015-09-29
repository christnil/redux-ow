import 'babel-core/polyfill';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainPanel from './containers/MainPanel';
import Sidebar from './containers/Sidebar';
import configureStore from './store/configureStore';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

React.render(
  <Provider store={store}>
    {() => <MainPanel />}
  </Provider>,
  document.getElementById('redux-main')
);

React.render(
  <Provider store={store}>
    {() => <Sidebar />}
  </Provider>,
  document.getElementById('redux-sidebar')
);
