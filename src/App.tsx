import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './globals.css';

import Other from './screens/Other/Other';
import Rename from './screens/Rename/Rename';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/other" component={Other} />
        <Route path="/" component={Rename} />
      </Switch>
    </Router>
  );
}
