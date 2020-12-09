import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import './Panel.css';
import jwt_decode from 'jwt-decode';

const ActiveLinksPanel = {
	color: '#0f5d99',
	fontWeight: '400',
};

const Panel = () => {
	const [user, setUser] = useState({});
	useEffect(() => {
		try {
			const token = localStorage.getItem('user');
			if (token) {
				const useri = jwt_decode(token);
				setUser(useri);
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<>
			<div className="admin-nav">
				<p className="greetings-the-user-p">
					Hi <span className="greetings-the-user-span"> {user.username}</span>
				</p>
				<NavLink
					to="/"
					tag="li"
					active-class="active"
					className="panel-links mt-3"
					activeStyle={ActiveLinksPanel}
					exact
				>
					<i className="fas fa-home panel-icons "></i>
					<span className="panel-title-spans">Home</span>
				</NavLink>

				<NavLink
					to="/admins/dashboard"
					tag="li"
					active-class="active"
					className="panel-links"
					activeStyle={ActiveLinksPanel}
					exact
				>
					<i className="fas fa-chart-pie panel-icons "></i>
					<span className="panel-title-spans">Dashboard</span>
				</NavLink>

				{user.role === 'superadmin' && (
					<>
						<NavLink
							to="/categories"
							tag="li"
							active-class="active"
							className="panel-links"
							activeStyle={ActiveLinksPanel}
							exact
						>
							<i className="fa fa-list-alt panel-icons"></i>
							<span className="panel-title-spans">Categories</span>
						</NavLink>
						<NavLink
							to="/tags"
							tag="li"
							active-class="active"
							className="panel-links"
							activeStyle={ActiveLinksPanel}
							exact
						>
							<i className="fas fa-hashtag panel-icons"></i>
							<span className="panel-title-spans">Tags</span>
						</NavLink>
						<NavLink
							to="/admins/users"
							tag="li"
							active-class="active"
							className="panel-links"
							activeStyle={ActiveLinksPanel}
							exact
						>
							<i className="fas fa-user-friends panel-icons"></i>
							<span className="panel-title-spans">Users</span>
						</NavLink>
					</>
				)}

				<Dropdown className="panel-links-dropdown">
					<i className="far fa-copy panel-icons-drp-big panel-title-spans"></i>
					<Dropdown.Toggle id="dropdown-basic" className="panel-link-drp-title">
						<span className="panel-title-spans">Courses</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item className="drp-i">
							{user.role === 'admin' && (
								<>
								<NavLink
									to="/add-course"
									tag="li"
									active-class="active"
									className="panel-links-drp-item"
									activeStyle={ActiveLinksPanel}
									exact
								>
									<i className="fa fa-plus panel-icons-drp-small" />
									<span>Add Course</span>
								</NavLink>
								
								<NavLink
								to="/admins/my-courses"
								tag="li"
								active-class="active"
								className="panel-links-drp-item"
								activeStyle={ActiveLinksPanel}
								exact
								>
								<i className="fa fa-briefcase panel-icons-drp-small" />
								<span>My Courses</span>
								</NavLink>	
								</>							
							)}

							{user.role === 'superadmin' && (
								<>
									<NavLink
										to="/admins/courses"
										tag="li"
										active-class="active"
										className="panel-links-drp-item"
										activeStyle={ActiveLinksPanel}
										exact
									>
										<i className="far fa-folder-open panel-icons-drp-small" />
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
										<i className="fas fa-tv panel-icons-drp-small" />
										<span>Course Review</span>
									</NavLink>
								</>
							)}
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</>
	);
};

export default withRouter(Panel);
