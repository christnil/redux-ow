import 'babel-core/polyfill';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainPanel from './containers/MainPanel.jsx';
import Sidebar from './containers/Sidebar.jsx';
import configureStore from './store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import './client.scss';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

if (module.hot) {
   React.render(
      <div>
        <Provider store={store}>
          {() => <MainPanel />}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>,
     document.getElementById('redux-main')
   );
} else {
   React.render(
        <Provider store={store}>
          {() => <MainPanel />}
       </Provider>,
     document.getElementById('redux-main')
   );
}


React.render(
  <Provider store={store}>
    {() => <Sidebar />}
  </Provider>,
  document.getElementById('redux-sidebar')
);
