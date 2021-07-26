import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Test = () => {
  return (
    <div>
      <p>Test page</p>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/test" component={Test} />
      </Switch>
    </Router>
  );
}
