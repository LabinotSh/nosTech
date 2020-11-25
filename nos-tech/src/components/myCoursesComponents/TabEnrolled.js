import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const selectedStyle = {
    padding: '.8rem',
borderBottomWidth: '2px',
borderBottomStyle:'solid',
borderBottomColor:'#191970',
    opacity: '1',
    color: '#191970',
};

const nonSelectedStyle = {
    color: '#000',
    textDecoration: 'none',
    fontSize: '20px',
    padding: '10px',
    cursor: 'pointer',
    opacity: '0.6',
    background: '#FFF',
    outline: '0',
};

const TabEnrolled = (props) => {
	return (
		<NavLink to="#enrolled" style={nonSelectedStyle} activeStyle={props.about ? selectedStyle : null}>
			<FontAwesomeIcon icon={props.about ? faLockOpen : faLock} className="fnt-lock" />
			Enrolled Courses
		</NavLink>
	);
};

export default TabEnrolled;
