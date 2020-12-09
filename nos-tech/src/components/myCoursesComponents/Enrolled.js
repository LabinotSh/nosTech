import React, { Component, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Enrolled = (props) => {
	const [desc, setDesc] = useState('');

	useEffect(() => {
		setDesc(props.course.description);
	}, []);

	return (
		<Card className="enrolled-c" key={props.course._id}>
			<div className="ovf">
				<Card.Img variant="top" className="c-image img-fluid" src={props.course.image} />
			</div>
			<Card.Body className="desc">
				<Card.Title className="title-co">{props.course.name}</Card.Title>
				<Card.Text className="deS">{desc}</Card.Text>
			</Card.Body>
			<Card.Body>
				<Card.Link className="c-link float-right" href={`course/${props.course._id}`}>
					Go to course <FontAwesomeIcon icon={faArrowRight} />
				</Card.Link>
			</Card.Body>
			<Card.Footer className="c-foot">
				<Card.Text className="inst float-left">
					<FontAwesomeIcon icon={faUser} />
				{props.author && (
                        <>
                            {/* Author:{' '} */}
                            <span className="author-name">{props.author.name + ' ' + props.author.surname}</span>
                        </>
                    )}
				</Card.Text>
			</Card.Footer>
		</Card>
	);
};

export default Enrolled;
