import React, { useState, useEffect, Component, useRef } from "react";
import "./myCourses.css";
import axios from "axios";
import MyCoursesBanner from "../../components/banner/MyCoursesBanner";
import {
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import { NavLink } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import { useDispatch } from "react-redux";
import { fetchAllCourses } from "../../redux/actions/courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MyCourses = ({ match }) => {
  const [courses, setCourses] = useState([]);
  const [video, setVideo] = useState("spinner.gif");
  const [about, setAbout] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('userFav')));
  const [favList, setFavList] = useState([]);

  const isRendered = useRef('false');

  const token = localStorage.getItem('user');
  const user = jwt_decode(token);

  const dispatch = useDispatch();

  const retrieveCourses = () => {
		isRendered.current = true;
		dispatch(fetchAllCourses())
			.then((response) => {
				if (isRendered) {
					setCourses(response);
					console.log('COURSES: ' + JSON.stringify(response));
				}
			})
			.catch((e) => {
				console.error('Error: ' + e);
			});
  };
  
  const getFav = (userId) => {
    axios.get(`${API_URL}/favorites/${userId}/getAll`).then(
      res => {
        console.log('fav ' + JSON.stringify(res.data));
      }
    ).catch(err => {
      console.log(err);
    })
  }

  // const getFavs = () => {
  //   let favs = JSON.parse(localStorage.getItem('userFav'));
  //   let array = [...favs];
  //   const fa = courses.map((item) => {
  //      if(array.find(i => i===item._id))
  //      return setFavList(item)
  //   });
  // };

  useEffect(() => {
    retrieveCourses();
    getFav(user._id);
    console.log('fa ' + favList);
    
  }, []);
  
  return (
    <>
      <div>
        <MyCoursesBanner />
        <h2 className="text-white">{courses.name}</h2>
        <h2 className="text-white">Kurset {courses.courses}</h2>
      </div>
      <div className="main-cont">
        <ul className="cs-nav">
          <li className="li-col" onClick={() => setAbout(true)} >
            <NavLink to='#abo' 
             style={{color:"#000" ,textDecoration:"none"}}
             activeStyle={about ? 
              {color:'#fff', borderRadius:'7%' , padding:'.65rem', backgroundColor:'#132440'} 
              : null}
            >Enrolled Courses</NavLink> 
          </li>
          <li className="li-col" onClick={() => setAbout(false)}>
           <NavLink to='#abo' 
            style={{color:"#000" ,textDecoration:"none"}}
            activeStyle={!about ? 
              {color:'#fff', borderRadius:'7%' , padding:'.65rem', backgroundColor:'#132440'} 
              : null}
            >Favorites</NavLink>
          </li>
        </ul>
        <hr className='text-center'/>
      </div>
      {about ? (
        <div id="abo" className="container abo" style={{marginBottom:'150px'}}>
           {courses && courses.map(course => {
            return (
            <Card key={course._id} style={{ width: "18rem",margin:"1rem" ,borderRadius:'5%'}}>
            <Card.Img variant="top" className="c-image img-fluid" src={course.image} />
            <Card.Body className="desc">
            <Card.Title>{course.name}</Card.Title>
              <Card.Text>{course.description}</Card.Text>
              {/* <Card.Link className="c-link float-right" href="#">Watch <FontAwesomeIcon icon={faArrowRight}/> </Card.Link> */}
            </Card.Body>
            <Card.Body>
            <Card.Link className="c-link float-right" href="#">Continue Watching <FontAwesomeIcon icon={faArrowRight}/> </Card.Link>
            </Card.Body>
            <Card.Footer className="card-foot">
            <Card.Text className="inst float-left">Instructor: {course._instructor}</Card.Text>
            </Card.Footer>
          </Card>
            );
          })}
        </div>
      ) : (   
        <div className="fav bg-light" id="2" style={{marginBottom:'150px'}}>
          {favList && favList.map(favorite => {
            // if(favList.find(i => i===favorite._id))
            return (
            <Card key={favorite._id} style={{ width: "18rem" ,borderRadius:'5%'}}>
            <Card.Img variant="top" className="card-img" src={favorite.image} />
            <Card.Body>
            <Card.Title>{favorite.name}</Card.Title>
              <Card.Text>{favorite.description}</Card.Text>
              <Card.Text>{favorite.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Price: {favorite.price}</ListGroupItem>
              <ListGroupItem>Instructor: {favorite._instructor}</ListGroupItem>
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