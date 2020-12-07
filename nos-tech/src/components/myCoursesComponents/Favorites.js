import React, { Component, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Favorites = (props) => {
	const [desc, setDesc] = useState('');

	useEffect(() => {
		setDesc(props.favorite.description);
	}, []);

	return (
		<Card className="fav-c" key={props.favorite._id}>
			<div className="ovf">
				<Card.Img variant="top" className="c-image img-fluid" src={props.favorite.image} />
			</div>
			<Card.Body className="desc">
				<Card.Title className="title-co">{props.favorite.name}</Card.Title>
				<Card.Text className="deS">{desc}</Card.Text>
			</Card.Body>
			<Card.Body>
				<Card.Link className="c-link float-right" href={`course/${props.favorite._id}`}>
					Go to course <FontAwesomeIcon icon={faArrowRight} />
				</Card.Link>
			</Card.Body>
			<Card.Footer className="c-foot">
				{/* <Card.Text className="inst float-left">Instructor: {props.favorite._instructor}</Card.Text> */}
			</Card.Footer>
		</Card>
	);
};

export default Favorites;
