import styled from 'styled-components';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createGlobalStyle } from 'styled-components';

import './App.css';
import Header from './components/Header';
import history from './history';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import Login from './components/Login';
import Loading from './components/Loading';
const GlobalStyled = createGlobalStyle`
  html {
    --slack-color : #3f0f40;
    box-sizing: border-box;
  }
`;

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <GlobalStyled />
      <Router history={history}>
        {!user ? (
          <Login />
        ) : (
          <React.Fragment>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </React.Fragment>
        )}
      </Router>
    </div>
  );
}

const AppBody = styled.div`
  display: flex;
  height: calc(100vh - 40px);
`;

export default App;
