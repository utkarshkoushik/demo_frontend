import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './components/CreateUser';
import UserProfile from './components/UserProfile'


function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
                {/* <Route exact path="/about">
                    <About />
                </Route> */}
                <Route exact path="/create">
                    <Home />
                </Route>
                <Route path='/:id' render={(props) => {
                    return ( <UserProfile {...props } /> )
                }}/>
                {/* <Route>
                    <NotFound />
                </Route> */}
            </Switch>
        </Router>
      
    </div>
  );
}

export default App;
