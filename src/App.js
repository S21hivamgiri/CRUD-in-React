import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import List from "./components/List";
import EditUser from './components/EditUser';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Add User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                User List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/edit">
                Edit User
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Add} />
        <Route exact path="/users" component={List} />
        <Route exact path="/edit" component={EditUser} />
      </Switch>
    </Router>
  );
}

export default App;
