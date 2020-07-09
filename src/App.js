import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// import Home from '../src/containers/Home';
import LoginAndRegister from './components/LoginRegister';
import AgentScreen from './components/AgentScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={LoginAndRegister} />
        <Route exact path="/home" component={AgentScreen} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
