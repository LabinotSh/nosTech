import React from "react";
import "./searchinfo.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchInfo = () => {
  return (
    <div className="wrap">
      <div className="search-info text-center">
        <h2 style={{ color: "black" }}>Easily Obtainable Information</h2>
        <p>
          A majority of people learning for professional development report
          career benefits like getting a promotion, a raise, or starting a new
          career. Apply what you learn with self-paced quizzes and hands-on
          projects. Get feedback from a global community of learners.
        </p>
        <Link to="/courses" className="link">
          <Button className="availableCourses">Available Courses</Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchInfo;
