import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/CreateUser";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/create">
            <Home />
          </Route>
          <Route exact path="/:id" component={UserProfile} />
          <Route exact path="/" component={UserProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
