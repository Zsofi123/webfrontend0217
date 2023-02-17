import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Kereses from "./sajatosztalyok/Kereses"
import Karacsony from "./sajatosztalyok/Karacsony"
import Husvet from "./sajatosztalyok/Husvet"
import Nevnap from "./sajatosztalyok/Nevnap"
import Szuletesnap from "./sajatosztalyok/Szuletesnap"
import Ujev from "./sajatosztalyok/Ujev"
import Osszes from "./sajatosztalyok/Osszes"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        
        Dice Roller
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Kereses"} className="nav-link">
                Keresés
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/Karacsony"} className="nav-link">
                  Karácsony
                </Link>
              </li>
            )}  
            {currentUser && (
              <li className="nav-item">
                <Link to={"/Husvet"} className="nav-link">
                  Húsvét
                </Link>
              </li>
            )}  
            {currentUser && (
              <li className="nav-item">
                <Link to={"/Nevnap"} className="nav-link">
                  Névnap
                </Link>
              </li>
            )} 
            {currentUser && (
              <li className="nav-item">
                <Link to={"/Szuletesnap"} className="nav-link">
                  Születésnap
                </Link>
              </li>
            )} 
            {currentUser && (
              <li className="nav-item">
                <Link to={"/Ujev"} className="nav-link">
                 Újév
                </Link>
              </li>
            )} 
            {currentUser && (
              <li className="nav-item">
                <Link to={"Osszes"} className="nav-link">
                 Összes
                </Link>
              </li>
            )} 





          </div>
          
         
      
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />

            <Route path="/Kereses" component={Kereses} />
            <Route path="/Karacsony" component={Karacsony} />
            <Route path="/Husvet" component={Husvet} />
            <Route path="/Nevnap" component={Nevnap} />
            <Route path="/Szuletesnap" component={Szuletesnap} />
            <Route path="/Ujev" component={Ujev} />
            <Route path="/Osszes" component={Osszes} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
