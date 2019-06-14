import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import JokesList from "./jokes/JokesList";

import "../styles/App.css";

class App extends React.Component {
  handleLogout = () => {
    //alert("Clicking logout");
    localStorage.removeItem("jwt");
    this.setState({ isLoggedIn: false });
    this.props.history.push("/login");
  };

  render() {
    const isLoggedIn = localStorage.getItem("jwt") ? true : false;

    return (
      <div className="App">
        <div className="App-card">
          <div className="nav-bar">
            {!isLoggedIn && (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            )}
            {isLoggedIn && <button onClick={this.handleLogout}>Logout</button>}
          </div>
          <main>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/jokes" component={JokesList} />
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
