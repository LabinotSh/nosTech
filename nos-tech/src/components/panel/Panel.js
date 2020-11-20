import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Panel.css';


const ActiveLinksPanel = {
    color: '#0f5d99',
    fontWeight: "400",
};

const Panel = () => {
    return(
        <>
    <div class="admin-nav">

    <NavLink
    to="/"
    tag="li"
    active-class="active"
    className="panel-links mt-5"
    activeStyle={ActiveLinksPanel}
    exact
    >
        <i class="fas fa-home panel-icons "></i>
        <span>Home</span>
    </NavLink>

    <NavLink
    to="/admins/dashboard"
    tag="li"
    active-class="active"
    className="panel-links"
    activeStyle={ActiveLinksPanel}
    exact
    >
        <i class="fas fa-chart-pie panel-icons "></i>
        <span>Dashboard</span>
    </NavLink>

    <NavLink
    to="/categories"
    tag="li"
    active-class="active"
    className="panel-links"
    activeStyle={ActiveLinksPanel}
    exact
    >
        <i class="fa fa-list-alt panel-icons"></i>
        <span>Categories</span>
    </NavLink>

    <NavLink
    to="/admins/users"
    tag="li"
    active-class="active"
    className="panel-links"
    activeStyle={ActiveLinksPanel}
    exact
    >
        <i class="fas fa-user-friends panel-icons"></i>
        <span>Users</span>
    </NavLink>
    
    <Dropdown className="panel-links-dropdown">
    <i class="far fa-copy panel-icons-drp-big "></i>
    <Dropdown.Toggle id="dropdown-basic" className="panel-link-drp-title">
        Courses
    </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item className="drp-i">

        <NavLink
        to="/add-course"
        tag="li"
        active-class="active"
        className="panel-links-drp-item"
        activeStyle={ActiveLinksPanel}
        exact
        >
        <i className="fa fa-plus panel-icons-drp-small"/>
        <span>Add Course</span>
        </NavLink>

        <NavLink
        to="/admins/courses"
        tag="li"
        active-class="active"
        className="panel-links-drp-item"
        activeStyle={ActiveLinksPanel}
        exact
        >
        <i className="far fa-folder-open panel-icons-drp-small"/>
        <span>All Courses</span>
        </NavLink>

        <NavLink
        to="/admins/course-review"
        tag="li"
        active-class="active"
        className="panel-links-drp-item"
        activeStyle={ActiveLinksPanel}
        exact
        >
        <i className="fas fa-tv panel-icons-drp-small"/>
        <span>Course Review</span>
        </NavLink>
        </Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
	</div>
        </>
    )
}

export default Panel