import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import App from './App';

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <div id="modal" />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
