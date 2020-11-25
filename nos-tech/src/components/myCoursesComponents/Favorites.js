import React, { Component } from 'react';
import { Card} from 'react-bootstrap';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Favorites = (props) => {
    return (
        <Card className="fav-c" key={props.favorite._id}>
        <div className="ovf">
            <Card.Img variant="top" className="c-image img-fluid" src={props.favorite.image} />
        </div>
        <Card.Body className="desc">
            <Card.Title>{props.favorite.name}</Card.Title>
            <Card.Text>{props.favorite.description}</Card.Text>
            {/* <Card.Link className="c-link float-right" href="#">Watch <FontAwesomeIcon icon={faArrowRight}/> </Card.Link> */}
        </Card.Body>
        <Card.Body>
            <Card.Link className="c-link float-right" href="#">
                Watch <FontAwesomeIcon icon={faArrowRight} />
            </Card.Link>
        </Card.Body>
        <Card.Footer className="c-foot">
            <Card.Text className="inst float-left">
                Instructor: {props.favorite._instructor}
            </Card.Text>
        </Card.Footer>
    </Card>
    );
}

export default Favorites;