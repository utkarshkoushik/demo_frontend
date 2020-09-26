import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/CreateUser";
import UserProfile from "./components/UserProfile";
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/create">
            <Home />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/:id" component={UserProfile} />
          <Route exact path="/" component={UserProfile} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
