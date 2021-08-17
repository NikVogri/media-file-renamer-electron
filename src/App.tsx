import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContext';

import './globals.css';

import Rename from './screens/Rename/Rename';
import Settings from './screens/Settings/Settings';

export default function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Rename} />
        </Switch>
      </Router>
    </GlobalContextProvider>
  );
}
