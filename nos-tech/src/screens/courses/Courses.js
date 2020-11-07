import React, { useState, useEffect, useLayoutEffect } from "react";
import "./courses.css";
import Carousel from "../../components/carousel/Carousel";
import { connect, useDispatch } from "react-redux";
import { fetchAllCourses } from "../../redux/actions/courses";
import { withRouter } from "react-router-dom";
import responsive from "../../constants/carouselResponsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import Banner from "../../components/banner/CourseBanner";
import ReactTooltip from "react-tooltip";
import { Card } from "react-bootstrap";
import { icon } from "@fortawesome/fontawesome-svg-core";

const Courses = ({ list }) => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);

  const [favorite, setFavorite] = useState(false);

  const retrieveCourses = () => {
    dispatch(fetchAllCourses())
      .then((response) => {
        setCourses(response.courses);
        console.log("COURSES: " + JSON.stringify(response));
      })
      .catch((e) => {
        console.error("Error: " + e);
      });
  };

  //Load courses on render
  useEffect(() => {
    retrieveCourses();
  }, []);

  const CourseCarousel = () => {
    return courses.map((course) => {
      return (
        <div className="container-fluid"> 
          <div className="card h-100 courses-card" key={course._id}>
            <ReactTooltip
              place="top"
              backgroundColor={"#fc4563"}
              type="success"
              effect="solid"
              data-offset="{'right':70}"
              className="tool"
            />
            <img
              src={course.image}
              className="card-img-top courseImg"
              alt="..."
            />
            <div>
              <h6 className="card-title courses-title">{course.name}</h6>
              <p className="card-text courses-desc">{course.description}</p>
              <div className="courses-footer">
                <div className="container-fluid">
                  <div className="row no-gutters">
                    <div className="col-sm-4 mt-2 justify-content-start">
                      <span className="price"
                        style={{
                          fontSize: "18px",
                          marginTop:"10px",
                          marginRight: "10px",
                        }}
                      >
                        <i className="fa fa-eur" /> {course.price}
                      </span>
                      {/* <button className="btn btn-sm btn-outline-dark float-left">{course.category}</button> */}
                    </div>
                    <div className="col-sm-2 ml-3 justify-content-end">
                     <div className="effect">
                      <span
                        class="hover"
                        data-tip={
                          favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <FontAwesomeIcon
                          icon={favorite ? faHeart : farHeart}
                          size="2x"
                          color={"#fc4563"}
                        //   className="effect"
                          style={{ marginRight: "4px" }}
                          onClick={() => setFavorite(!favorite)}
                        />
                      </span>
                      </div>
                    </div>
                   
                    <div className="col-sm-5">
                      <button
                        className="btn btn-outline-success buy"
                        type="submit"
                      >
                        Enroll now
                      </button>                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      );
    });
  };

  return (
    <div>
      <Banner />
      <div className="top-content">
        <div className="courses-headline text-center">Courses we offer!</div>
        <hr
          style={{ width: "40%", marginLeft: "30%", marginBottom: "3%" }}
        ></hr>

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
    list: state.courses.courses,
  };
}

export default connect(mapStateToProps, { fetchAllCourses })(
  withRouter(Courses)
);
