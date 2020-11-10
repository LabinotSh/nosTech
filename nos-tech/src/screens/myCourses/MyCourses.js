import React, { useState, useEffect, Component } from "react";
import "./myCourses.css";
import axios from "axios";
import Feedback from "../course/Feedback";
import spinner from "./spinner.gif";
import MyCoursesBanner from "../../components/banner/MyCoursesBanner";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
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

  const user = localStorage.getItem('user');
  const decoded = jwt_decode(user);
  const id = decoded._id;

  const fetchCourse = async () => {
      
    const { data } = await axios.get(`/api/user/${id}`);
    // .then(res => {
    //   if(user._id === res.user._id){

    //   }
    // });
    setCourse(data);
    //setVideo(data.videos[0]);
  };

  useEffect(() => {
    
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
      </div>
      <div className="mx-1 mt-4 main-cont">
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
        <div id="abo" className="abo">
          <div className="abo-left">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>{course.name}</Card.Title>
              <Card.Text>Description......</Card.Text>
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
        
        <div className="fav bg-light">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>MERN course</Card.Title>
              <Card.Text>Description......</Card.Text>
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
        </div>
      )}
    </>
  );
};

export default MyCourses;
