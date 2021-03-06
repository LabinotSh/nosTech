import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const selectedStyle = {
	padding: '.8rem',
	borderBottomWidth: '2px',
	borderBottomStyle: 'solid',
	borderBottomColor: '#fc4563',
	opacity: '1',
	color: '#000',
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

const TabFavs = (props) => {
	return (
		<NavLink to="#favorites" style={nonSelectedStyle} activeStyle={!props.about ? selectedStyle : null}>
			<FontAwesomeIcon icon={!props.about ? faHeart : farHeart} className="fnt-lock" />
			Favorites
		</NavLink>
	);
};

export default TabFavs;
