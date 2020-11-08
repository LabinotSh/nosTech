import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink, Redirect, withRouter } from "react-router-dom"
import "./dropdown-items.css";

import store from "../../store";
import { logout } from "../../redux/actions/auth";
import { history } from "../../helpers/history";
import {connect, useDispatch } from "react-redux";
// import DropdownItems from "../dropdown-items/DropdownItems";



function DropdownItems() {
  
  const dispatch = useDispatch(); 
  const user = localStorage.getItem("user");

  const LogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    
    //history.push('/login');
    //window.location.reload();
  };



  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">My Account</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">
        {user && (
            <Link
              to="/profile"
              tag="li"
              active-class="active"
              exact
              style={{ textDecoration: "none" }}
            >
              My profile
            </Link>
          )}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          href="#/action-3"
          tag="li"
          active-class="active"
          // onClick={LogOut}
          exact
          style={{ textDecoration: "none" }}
        >
          {user && (
            <Link
              to='/login'
              tag="li"
              active-class="active"
              onClick={LogOut}
              exact
              style={{ textDecoration: "none" }}
            >
              Log Out
            </Link>
          )}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default connect(null, {logout}) (withRouter(DropdownItems));