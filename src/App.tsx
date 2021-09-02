import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import SelectedCorrectContentFromList from './components/SelectedCorrectContentFromList/SelectedCorrectContentFromList';
import GlobalContextProvider from './contexts/GlobalContext';

import './globals.css';
import { toggleShowUserContentSelectionModal } from './redux/actions/uiActionsCreator';
import { RootState } from './redux/store';

import Rename from './screens/Rename/Rename';
import Settings from './screens/Settings/Settings';

export default function App() {
  const dispatch = useDispatch();
  const { showContentListPrompt } = useSelector((state: RootState) => state.ui);
  const { fetchResults } = useSelector((state: RootState) => state.file);

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
      <SelectedCorrectContentFromList
        show={showContentListPrompt}
        setShow={() => dispatch(toggleShowUserContentSelectionModal())}
        fetchResults={fetchResults}
      />
    </GlobalContextProvider>
  );
}
