import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import GlobalContextProvider from './contexts/GlobalContext';

import './globals.css';

import Rename from './screens/Rename/Rename';
import Settings from './screens/Settings/Settings';

export default function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Rename} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Layout>
      </Router>
    </GlobalContextProvider>
  );
}
