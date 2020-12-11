import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import './dropdown-items.css';
import { logout } from '../../redux/actions/auth';
import { connect, useDispatch } from 'react-redux';
// import DropdownItems from "../dropdown-items/DropdownItems";

function DropdownItems({usr}) {
	const dispatch = useDispatch();
	const [role, setRole] = useState('');

	const [act, setAct] = useState(false);

	const LogOut = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	useEffect(() => {
		if(usr){
			setRole(usr.role);
		}
	},[usr])

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
				{(role !== 'admin') && (
					<Dropdown.Item
					active={act}
					href="/myCourses"
					tag="li"
					active-class="active"
					onClick={() => setAct(true)}
				>
					Courses
				</Dropdown.Item>
				)}
				{(role !== 'user') && (
					<Dropdown.Item
					active={act}
					href="/admins/dashboard"
					tag="li"
					active-class="active"
					onClick={() => setAct(true)}
				>
					Dashboard
				</Dropdown.Item>
				)}	
				<Dropdown.Divider />
				<Dropdown.Item
					active={act}
					onClick={LogOut}
					tag="li"
					active-class="active"
					onSelect={() => setAct(true)}
					style={{ textDecoration: 'none' }}
				>
					Log Out
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

const mapStateToProps = (state) => ({
	usr: state.login.user
})

export default connect(mapStateToProps, { logout })(withRouter(DropdownItems));
