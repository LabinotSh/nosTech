import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink, Redirect, withRouter } from "react-router-dom";
import "./dropdown-items.css";

import store from "../../store";
import { logout } from "../../redux/actions/auth";
import { history } from "../../helpers/history";
import { connect, useDispatch } from "react-redux";
// import DropdownItems from "../dropdown-items/DropdownItems";

function DropdownItems() {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  const [act, setAct] = useState(false);

  const LogOut = (e) => {
    e.preventDefault(); 
    dispatch(logout());
   
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">My Account</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          active={act} 
          href="/myProfile"
          tag="li"
          active-class="active"
          onClick={() => setAct(true)} 
        >
          Profile          
        </Dropdown.Item>
        <Dropdown.Item
          active={act}  
          href="/myCourses"
          tag="li"
          active-class="active"
          onClick={() => setAct(true)} 
          >
            Courses
        </Dropdown.Item>
        <Dropdown.Item
          active={act}  
          href="/admins/dashboard"
          tag="li"
          active-class="active"
          onClick={() => setAct(true)} 
          >
            Dashboard
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          active={act}
          onClick={LogOut}
          tag="li"
          active-class="active"
          onSelect={() => setAct(true)}
          style={{ textDecoration: "none" }}
        >
            Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}


export default connect(null, { logout })(withRouter(DropdownItems));
