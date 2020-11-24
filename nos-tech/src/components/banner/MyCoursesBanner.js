import React from "react";
import "./Banner.css";
import { faLaptop, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faLaptopCode,
  faChalkboard,
} from "@fortawesome/free-solid-svg-icons";

function MyCoursesBanner() {
  return (
    <div className="MyCourseBanner">
      <div className="my-container text-center">
        <div className="text-center">
          <h1 className="MyCourseBanner-title pt-3 pb-2">
            {/* <img
              src={require("../../assets/images/learn.jpg")}
              className="text-center"
            /> */}
            <span className="my">my</span> Courses
              <FontAwesomeIcon icon={faLaptop} color={'#fff'} style={{marginLeft:'10px'}} />
          </h1>
          <div className="anime text-light">
            View all the courses you are subscribed to and added as Favorites
            <FontAwesomeIcon icon={faHeart} color={"#fc4563"} /> !
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCoursesBanner;
