import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./dropdown-items.css";

import store from "../../store";
import { logout } from "../../redux/actions/auth";
import { history } from "../../helpers/history";
// import DropdownItems from "../dropdown-items/DropdownItems";

const user = localStorage.getItem("user");

const LogOut = (e) => {
  e.preventDefault();
  store.dispatch(logout());
  history.push("/login");
  window.location.reload();
};

function DropdownItems() {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">My Account</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          href="#/action-3"
          tag="li"
          active-class="active"
          onClick={LogOut}
          exact
          style={{ textDecoration: "none" }}
        >
          {user && (
            <Link
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

export default DropdownItems;
