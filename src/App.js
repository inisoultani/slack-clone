import styled from "styled-components";
import React from "react";
import { Router, Route, Switch } from "react-router";
import { createGlobalStyle } from "styled-components";

import "./App.css";
import CommentBox from "./components/CommentBox";
import CommentList from "./components/CommentsList";
import Header from "./components/Header";
import history from "./history";
import Sidebar from "./components/Sidebar";

const GlobalStyled = createGlobalStyle`
  html {
    --slack-color : #3f0f40;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyled />
      <Router history={history}>
        <Header />

        <AppBody>
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              {/* <CommentBox />
              <CommentList /> */}
            </Route>
          </Switch>
        </AppBody>
      </Router>
    </div>
  );
}

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

export default App;
