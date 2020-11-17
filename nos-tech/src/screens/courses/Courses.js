import React, { useState, useEffect } from "react";
import "./courses.css";
import Carousel from "../../components/carousel/Carousel";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchAllCourses, addToFavorites, removeFromFavorites } from "../../redux/actions/courses";
import { withRouter, Link, Redirect } from "react-router-dom";
import responsive from "../../constants/carouselResponsive";
import Banner from "../../components/banner/CourseBanner";
import ReactTooltip from "react-tooltip";
import Loader from "../../components/icons/Loader";
import { HeartFull, HeartEmpty } from "../../components/icons/Heart";
import SearchBar from "../../components/searchBar/searchBar";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { history } from "../../helpers/history";
import jwt_decode from 'jwt-decode';

const Courses = ({ list, pending, msg, loggedIn  }) => {
  const dispatch = useDispatch();

  // const token = localStorage.getItem('user');
  // const decoded = jwt_decode(token);
  // const userId = decoded._id;

  const [user,setUser] = useState({});
  const [enrolled,setEnrolled]= useState(false)
  const [listCourses, setCourses] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [favorite, setFavorite] = useState(false);

  const [displayMessage, setDisplayMessage] = useState("");
  
  const handleChange = (e) => {
       setFilterText(e.target.value);
  }

  const retrieveCourses = () => {
    dispatch(fetchAllCourses())
      .then((response) => {
        setCourses(response);
        console.log("COURSES: " + JSON.stringify(response));
      })
      .catch((e) => {
        console.error("Error: " + e);
      });
  };
  const redirectOnClick = (id) => {
    setTimeout(() => {
      if(loggedIn || localStorage.getItem('user')){
        history.push(`course/${id}`);
    }else{
      history.push('/login');
    }
    window.location.reload();
      
    }, 700);
      
  }

  //Load courses on render
  useEffect(() => {
    retrieveCourses();
    // console.log('tokeni ' + userId)  
  }, []);

  //Make the search appear after like 1.5 seconds and not immediately as the user is typing
  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(filterText), 1000);
    return () => clearTimeout(timeOutId);
  }, [filterText]);

  const favorites = localStorage.getItem('favs');
//   const tokenii = localStorage.getItem('token');
  
  useEffect(() => {
    try {
        const token = localStorage.getItem('user');
        
        if(token) {
            const useri = jwt_decode(token)
            
            setUser(useri)
            console.log('sss ' + user);
            if(favorites.users) {
                if(favorites.users.find(u => u.toString() === user._id.toString())) {
                    console.log('aaaa ' + user);
                    setEnrolled(true)
                } 
            }
        }
    }catch(e) {
        console.log(e)
    }
},[favorites]) 

  
    const results = !displayMessage
    ? listCourses
    : listCourses.filter(course =>
          course.name.toLowerCase().includes(displayMessage.toLocaleLowerCase())
    );
  
  const CourseCarousel = (props) => {
    if(!results.length) return <div className="unmatch text-center">There is no matching searches!</div>
   
    return results.map((course) => {
      return (
        <div className="card courses-card" key={course._id}>
          <ReactTooltip
            place="top"
            backgroundColor={"#fc4563"}
            type="success"
            effect="solid"
          />
         <LinkContainer to={`course/${course._id}`}>
              <img
                src={course.image}
                className="card-img-top courseImg"
                alt="..."
              />
         </LinkContainer>
          <div>
            <h6 className="card-title courses-title">{course.name}</h6>
            <p className="card-text courses-desc">{course.description}</p>
            <div className="courses-footer">
              <strong style={{ fontSize: "18px", marginTop: "6px" }}>
                <i className="fa fa-eur" /> {course.price}
              </strong>

              <div className="justify-content-center">
                {localStorage.getItem("user") && (
                    <>
                    {msg ? (<span
                    className="hover"
                    data-tip={
                        favorite || localStorage.getItem("favs") ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    {favorite || localStorage.getItem("favs") ? (
                        <>
                      <HeartFull
                        onClick={() => {
                          setFavorite(false);
                          localStorage.removeItem("favs");
                          dispatch(removeFromFavorites(course._id, course, user));
                        }}
                      />
                      </>
                    ) : (
                        <>
                      <HeartEmpty
                        onClick={() => {
                          setFavorite(true);
                          dispatch(addToFavorites(course._id, course, user));
                        }}
                      />         
                      </>
                    )}
                  </span> ) : (
                      <span
                      className="hover"
                      data-tip={
                        favorite || localStorage.getItem("favs") ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      {favorite || localStorage.getItem("favs") ? (
                          <>
                        <HeartFull
                          onClick={() => {
                            setFavorite(false);
                            // localStorage.removeItem("favs");
                            // dispatch(removeFromFavorites(course._id, course));
                          }}
                        />
                        </>
                      ) : (
                          <>
                        <HeartEmpty
                          onClick={() => {
                            setFavorite(true);
                            // dispatch(addToFavorites(course._id, course));
                          }}
                        />                       
                        </>
                      )}
                    </span>
                  )}     
                  </>
                )}
                <button
                  className="btn btn-default buy"
                  type="submit"
                  onClick={() => {
                      redirectOnClick(course._id);   
                  }}
                >
                Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  if (pending) return <Loader />;
  return (
    <div>
      <Banner />
      <div className="container-fluid top-content">
        <div className="row no-gutters pb-4">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 text-center">
            <p className="courses-headline">Courses we offer!</p>
            <hr/>
          </div>
          <div className="col-sm-4 text-center">
              <SearchBar 
               input={filterText}
               onChange={handleChange} />
           </div> 
        </div>
        <Carousel
          responsive={responsive}
          paddingLeft={50}
          disableDotsControls={true}
        >
          {CourseCarousel()}
        </Carousel>
        <hr></hr>
      </div>
      <div className="middle-content">
        <p className="courses-headline">Recent NosTech Courses</p>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
      loggedIn: state.login.isLoggedIn,
    pending: state.courses.pending,
    list: state.courses.courses,
    msg: state.favorites.favorites.msg
  };
}

export default connect(mapStateToProps, { addToFavorites, removeFromFavorites, fetchAllCourses})(Courses);