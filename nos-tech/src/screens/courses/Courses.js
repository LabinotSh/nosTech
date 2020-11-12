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
import axios from "axios";

import { HeartFull, HeartEmpty } from "../../components/icons/Heart";
import { array } from "yup";
import { API_URL } from "../../constants/Constants";
import Notifications, { notify } from "react-notify-toast";

const Courses = ({ list, pending }) => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [mounted, setMounted] = useState(true);

  const toastColor = { background: "#6279AB", text: "#FFFFFF" };

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
  {
    /* <FontAwesomeIcon
                    icon={favorite ? faHeart : farHeart}
                    size="2x"
                    color={"#fc4563"}
                    style={{ marginRight: "5px", marginTop: "3px" }}
                    //  onFocus={() => }
                    onClick={() => setFavorite(!favorite)}
                  /> */
  }

  //Load courses on render
  useEffect(() => {
    setTimeout(() => {
      retrieveCourses();
      setMounted(false);
      console.log("FAVVVVOTIREE " + favList);
    }, 1000);
    // console.log('ID ' + id);
  }, []);

  const toCourseDet = (id) => {
    setTimeout(() => {
      history.push(`/course/${id}`);
      window.location.reload();
    }, 700);
  };

  const addToFav = (id, props) => {
    let array = favList;
    let add = true;
    axios
      .put(`${API_URL}/course/fav/add/${id}`)
      .then(() => {
        console.log("ADDEDDDDDD");

        array.map((item) => {
          if (item === props) {
            add = false;
          }
        });
        if (add) {
          array.push(props);
          setFavList([...array]);
        }

        localStorage.setItem("favs", favList);

        setFavorite(true);
      })
      .catch((err) => console.log(err));
  };

  const removeFromFav = (id, props) => {
    let array = favList;
    let remove = false;
    axios
      .put(`${API_URL}/course/fav/remove/${id}`)
      .then(() => {
        console.log("Removed");

        array.map((item) => {
          if (item === props) {
            remove = true;
          }
        });
        if (remove) {
          array.pop(props);
          setFavList([...array]);
        }

        localStorage.removeItem("favs");

        setFavorite(false);
      })
      .catch((err) => console.log(err));
  };

  const CourseCarousel = () => {
    //if(pending) return <Spinner size='5x' spinning="spinning" />
    return courses.map((course) => {
      return (
        <div className="card courses-card" key={course._id}>
          <Notifications options={{ width: "800px", top: "10px" }} />
          <ReactTooltip
            place="top"
            backgroundColor={"#fc4563"}
            type="success"
            effect="solid"
          />
          <Link
            to="/courses/:id"
            onClick={() => {
              toCourseDet(course._id);
            }}
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
                {localStorage.getItem('user') ? (
                <span
                  className="hover"
                  data-tip={
                    localStorage.getItem("favs") && localStorage.getItem("user")
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {localStorage.getItem("favs") &&
                  localStorage.getItem("user") ? (
                    <HeartFull
                      onClick={() => {
                        
                          removeFromFav(course._id, course);
                          // localStorage.removeItem('favs');
                          // setFavorite(false)
                        
                        //   notify.show(
                        //     <div>
                        //       You must be logged in to remove from favorites
                        //       <button
                        //         className="btn btn-sm btn-outline-light"
                        //         onClick={notify.hide}
                        //       >
                        //         {" "}
                        //         X{" "}
                        //       </button>
                        //     </div>,
                        //     "custom",
                        //     -1,
                        //     toastColor
                        //   );
                        // }
                      }}
                    />
                  ) : (
                    <HeartEmpty
                      onClick={() => {
                        // if (localStorage.getItem("user")) {
                          addToFav(course._id, course);

                          //setFavorite(true);
                        // } else {
                        //   notify.show(
                        //     <div>
                        //       You must be logged in to add to favorites
                        //       <button
                        //         className="btn btn-sm btn-outline-light"
                        //         onClick={notify.hide}
                        //       >
                        //         {" "}
                        //         X{" "}
                        //       </button>
                        //     </div>,
                        //     "custom",
                        //     -1,
                        //     toastColor
                        //   );
                        // }
                      }}
                    />
                  )}
                </span>
                //if the user is not logged in then dont show his favorites
                 ):(
                    <span
                    className="hover"
                    data-tip={
                      favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {favorite ? (
                      <HeartFull
                        onClick={() => {
                          if (localStorage.getItem("user")) {
                            removeFromFav(course._id, course);
                            // localStorage.removeItem('favs');
                            // setFavorite(false)
                          } else {
                            notify.show(
                              <div>
                                You must be logged in to remove from favorites
                                <button
                                  className="btn btn-sm btn-outline-light"
                                  onClick={notify.hide}
                                >
                                  {" "}
                                  X{" "}
                                </button>
                              </div>,
                              "custom",
                              -1,
                              toastColor
                            );
                          }
                        }}
                      />
                    ) : (
                      <HeartEmpty
                        onClick={() => {
                          if (localStorage.getItem("user")) {
                            addToFav(course._id, course);
  
                            //setFavorite(true);
                          } else {
                            notify.show(
                              <div>
                                You must be logged in to add to favorites
                                <button
                                  className="btn btn-sm btn-outline-light"
                                  onClick={notify.hide}
                                >
                                  {" "}
                                  X{" "}
                                </button>
                              </div>,
                              "custom",
                              -1,
                              toastColor
                            );
                          }
                        }}
                      />
                    )}
                  </span>
                 )}

                <button
                  className="btn btn btn-outline-success buy"
                  type="submit"
                >
                  Buy now
                </button>

                {/* Testing the favorite list of courses */}
                {/* <ul>
                  {favList &&
                    favList.map((item) => {
                      return (
                        <div key={item._id}>
                          <li>{item.name}</li>
                        </div>
                      );
                    })}
                </ul> */}
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
