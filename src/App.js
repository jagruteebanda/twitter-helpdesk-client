import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from '../src/containers/Home';
import LoginAndRegister from './components/LoginRegister';
import AgentScreen from './components/AgentScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginAndRegister />
        </Route>
        <Route exact path="/home">
          <AgentScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
