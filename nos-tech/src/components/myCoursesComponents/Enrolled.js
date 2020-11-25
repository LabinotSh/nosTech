import React, { Component } from 'react';
import { Card} from 'react-bootstrap';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Enrolled = (props) => {
	return (
		<Card className="enrolled-c" key={props.course._id}>
			<div className="ovf">
				<Card.Img variant="top" className="c-image img-fluid" src={props.course.image} />
			</div>
			<Card.Body className="desc">
				<Card.Title>{props.course.name}</Card.Title>
				<Card.Text>{props.course.description}</Card.Text>
				{/* <Card.Link className="c-link float-right" href="#">Watch <FontAwesomeIcon icon={faArrowRight}/> </Card.Link> */}
			</Card.Body>
			<Card.Body>
				<Card.Link className="c-link float-right" href="#">
					Continue Watching <FontAwesomeIcon icon={faArrowRight} />
				</Card.Link>
			</Card.Body>
			<Card.Footer className="c-foot">
				<Card.Text className="inst float-left">Instructor: {props.course._instructor}</Card.Text>
			</Card.Footer>
		</Card>
	);
};

export default Enrolled;
