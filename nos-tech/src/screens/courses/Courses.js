import React, { useState, useEffect, useLayoutEffect } from "react";
import "./courses.css";
import Carousel from "../../components/carousel/Carousel";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../redux/actions/courses";
import { withRouter, Link } from "react-router-dom";
import responsive from "../../constants/carouselResponsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import Banner from "../../components/banner/CourseBanner";
import ReactTooltip from "react-tooltip";
import { Card } from "react-bootstrap";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Spinner from "../../components/icons/Spinner";
import Loader from "../../components/icons/Loader";
import { history } from "../../helpers/history";

import {HeartFull, HeartEmpty} from '../../components/icons/Heart';

const Courses = ({ list, pending }) => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [mounted, setMounted] = useState(true);

  const [favorite, setFavorite] = useState(false);
  const [favList, setFavList] = useState([]);
  //const [id, setId] = useState('');

  const retrieveCourses = () => {
    dispatch(fetchAllCourses())
      .then((response) => {
        setCourses(response);
        //setId(response._id);
        setMounted(false);

        console.log("COURSES: " + JSON.stringify(response));
      })
      .catch((e) => {
        console.error("Error: " + e);
        setMounted(false);
      });
  };

  // const {id} = props.match.params;

  //Load courses on render
  useEffect(() => {
    setTimeout(() => {
      retrieveCourses();
      setMounted(false);
      console.log('FAVVVVOTIREE ' + favList);
    }, 1000);
    // console.log('ID ' + id);
  }, []);

  const toCourseDet = (id) => {
    setTimeout(() => {
      history.push(`/course/${id}`);
      window.location.reload();
    }, 1000);
  };


  const addFav = (props) => {
      let array = favList;
      let addArray = true;
      array.map(item => {
          if(item === props){
            //   array.splice()
            addArray = false;
          }
      });
      if(addArray){
          array.push(props);
      }

      setFavList([...array]);
  }

  const removeFav = (props) => {
      let array = favList;
      let removeArray = false;
      array.map(item => {
          if(item===props){
              removeArray=true;
              array.pop(item);
          }
      });

      setFavList([...array]);
  }

  const CourseCarousel = () => {
    //if(pending) return <Spinner size='5x' spinning="spinning" />
    return courses.map((course) => {
      return (
        <div className="card courses-card" key={course._id}>
          <ReactTooltip
            place="top"
            backgroundColor={"#fc4563"}
            type="success"
            effect="solid"
          />
          <Link to
            onClick={() => { toCourseDet(course._id);}}
          >
            <img
              src={course.image}
              className="card-img-top courseImg"
              alt="..."
            />
          </Link>
          <div>
            <h6 className="card-title courses-title">{course.name}</h6>
            <p className="card-text courses-desc">{course.description}</p>
            <div className="courses-footer">
              <strong style={{ fontSize: "18px", marginTop: "6px" }}>
                <i className="fa fa-eur" /> {course.price}
              </strong>
              {/* <button className="btn btn-sm btn-outline-dark float-left">{course.category}</button> */}

              <div className="justify-content-center">
                <span
                  className="hover"
                  data-tip={
                    favorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                    {favorite
                    ? <HeartFull onClick={() =>{ setFavorite(false); 
                        removeFav(course);
                    console.log('FACEE ' + favorite);
                    console.log('Ffasdsd ' + favList[0])}}/>
                    : <HeartEmpty onClick={() => {setFavorite(true);
                         addFav(course);
                    console.log('FAVVV '+ favorite);}}/> }

                  {/* <FontAwesomeIcon
                    icon={favorite ? faHeart : farHeart}
                    size="2x"
                    color={"#fc4563"}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                    //  onFocus={() => }
                    onClick={() => setFavorite(!favorite)}
                  /> */}
                </span>
                {/* <button className="btn btn-outline-success float-left" type="submit" style={{marginRight:'2px'}}>Buy now</button>  */}

                <button
                  className="btn btn btn-outline-success buy"
                  type="submit"
                >
                  Buy now
                </button>

                {/* Testing the favorite list of courses */}
                <ul>
                    {favList && favList.map(item => {
                    return (
                     <div key={item._id}><li>{item.name}</li>
                     </div>
                    );
                     })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  if (list) return <Loader />;
  return (
    <div>
      <Banner />
      <div className="top-content">
        <p className="courses-headline">Courses we offer!</p>
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
    pending: state.courses.pending,
    list: state.courses.courses,
  };
}

export default connect(mapStateToProps, { fetchAllCourses })(
  withRouter(Courses)
);
