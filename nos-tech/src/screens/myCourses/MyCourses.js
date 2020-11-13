import React, { useState, useEffect, Component } from "react";
import "./myCourses.css";
import axios from "axios";
import Feedback from "../course/Feedback";
import spinner from "./spinner.gif";
import MyCoursesBanner from "../../components/banner/MyCoursesBanner";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Row,
  Col,
  Nav,
  Container,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import jwt_decode from 'jwt-decode';


const MyCourses = ({ match }) => {
  const [course, setCourse] = useState([]);
  const [video, setVideo] = useState("spinner.gif");
  const [about, setAbout] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const user = localStorage.getItem('user');
  const decoded = jwt_decode(user);
  const id = decoded._id;

  const favs = localStorage.getItem('favorites');

  const fetchCourse = async () => { 
    //const { data } = await axios.get(`/api/user/${id}`);
    axios.get(`api/user/${id}`)
    .then(res => {
      setCourse(res.data);
      console.log('User data : ' + JSON.stringify(res.data));
    })
    .catch(err => console.log(err));
    
  };

  const getFavorites = async () => {
    axios.get('api/course/favs/added')
    .then(res => {
      setFavorites(res.data);
      console.log('FAvorites ' + JSON.stringify(res.data));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
     getFavorites();
    fetchCourse();
  
  }, []);

  const videoChangeHandler = (name) => {
    setVideo(name);
  };



  
  return (
    <>
      <div>
        <MyCoursesBanner />
        {/* <h6>Categories &gt; <a href="#">{course.category}</a></h6> */}
        <h2 className="text-white">{course.name}</h2>
        <h2 className="text-white">Kurset {course.courses}</h2>
      </div>
      <div className="mx-1 main-cont">
        <ul className="cs-nav">
          <li className="li-col" onClick={() => setAbout(true)}>
            Subscribed Courses
          </li>
          <li className="li-col" onClick={() => setAbout(false)}>
            Favorites
          </li>
        </ul>
        <hr></hr>
      </div>
      {about ? (
        <div id="abo" className="abo" style={{marginBottom:'150px'}}>
          <div className="abo-left">
          <Card style={{ width: "18rem" }}>
            <Card.Img  src={course.image} />
            <Card.Body>
            <Card.Title>{course.name}</Card.Title>
              <Card.Text>Description......
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Price: </ListGroupItem>
              <ListGroupItem>Author: </ListGroupItem>
              <ListGroupItem></ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Watch</Card.Link>
              {/* <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
          </Card>
            <p>{course.description}</p>
          </div>
          <div className="abo-right"></div>
        </div>
      ) : (
        
        <div className="fav bg-light" style={{marginBottom:'150px'}}>
          {favorites && favorites.map(favorite => {
            return (
            <Card key={favorite._id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={favorite.image} />
            <Card.Body>
            <Card.Title>{favorite.name}</Card.Title>
              <Card.Text>{favorite.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Price: {favorite.price}</ListGroupItem>
              <ListGroupItem>Instructor: {favorite._instructor}</ListGroupItem>
              <ListGroupItem></ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Watch</Card.Link>
              {/* <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
          </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyCourses;
