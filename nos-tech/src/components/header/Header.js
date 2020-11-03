import React from "react";
import { Nav, Button } from "react-bootstrap";
import { Link,NavLink } from "react-router-dom";
import "./header.css";
import nosTech from "../../assets/images/nostech.png";
import store from '../../store';
import {logout} from '../../redux/actions/auth';
import {history} from '../../helpers/history';

const user = localStorage.getItem('user');
const ActiveLinks = {
  color: "#f06470",
  fontWeight: "500"
}
const LogOut = (e) => {
  e.preventDefault();
  store.dispatch(logout());
  history.push('/login');
  window.location.reload();
}

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark static-top font header">
        <div className="container">
          <a className="logo mar" style={{ fontSize: "24px", padding: "0" }}>
            <img src={nosTech} style={{ width: "60px" }}></img>{" "}
          </a>
          <button
            className="navbar-toggler test"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <div className="col-md-12 mx-auto">
              <div className="d-flex float-left col-md-10">
                <div className="mx-auto">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <NavLink
                        to="/"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        to="/courses"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        Courses
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/articles"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        Articles
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/forum"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        Forum
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/about-us"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/contact"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="float-left d-flex col-md-2">
                <div id="c">
                  <ul class="navbar-nav ml-auto">
                  {!user && (
                    <li className="nav-item">
                      <NavLink
                        to="/login"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        Login
                      </NavLink>
                    </li>
                  )}
                    {!user && (
                    <li className="nav-item">
                      <NavLink
                        to="/registration"
                        tag="li"
                        active-class="active"
                        className="navigation"
                        activeStyle={ActiveLinks}
                        exact
                      >
                        Register
                      </NavLink>
                    </li>
                      )}
                    {user && (
                     <li className="nav-item">
                      <Link 
                      tag="li" 
                      active-class="active" 
                      onClick={LogOut} 
                      exact 
                      style={{textDecoration:"none"}}
                      >
                      <span className="text-dark"> Logout </span>
                      </Link>
                     </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
