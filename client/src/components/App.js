import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import JokesList from "./jokes/JokesList";

import "../styles/App.css";

class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  handleLogout = e => {
    e.preventDefault();
    alert("Clicking logout");
    // localStorage.removeItem("jwt");
    // window.location.reload();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-card">
            <div className="nav-bar">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
              <button onClick={this.handleLogout}>Logout</button>
            </div>
            <main>
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/jokes" component={JokesList} />
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
