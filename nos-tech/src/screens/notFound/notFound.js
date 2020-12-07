import React, { Component } from 'react';
import './notfound.css';

const NotFound = () => {
	return (
		<div id="notfound">
			<div className="notfound">
				<div className="notfound-404">
					<h1>404</h1>
				</div>
				<h2>Oops, The Page you are looking for can't be found!</h2>
				{/* <form class="notfound-search">
					<input type="text" placeholder="Search..." />
					<button type="button">Search</button>
				</form> */}
				<a id="a-not" href="/">
					<span className="arrow"></span>Return To Homepage
				</a>
			</div>
		</div>
	);
};

export default NotFound;
