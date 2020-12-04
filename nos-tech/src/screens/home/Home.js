import React, { useEffect } from "react";
import "./home.css";
import Cards from "../../components/card/Cards";
import Sources from "../../components/sources/Sources";
import Info from "../../components/search-info/SearchInfo";
import { Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Home() {
  useEffect(() => {
    setTimeout(() => {}, 700);
  });
  return (
    <>
      <div className="programming">
        <div className="programming-content">
          <h3 className="text-center">Become Job-Ready in No Time</h3>
          <p className="text-center res">
            Start using our resources for developing the necessary skills to
            land your dream job!
          </p>
          {localStorage.getItem('user') ? (
            <Link to="/courses">
            <Button className="get-started-btn">Get Started</Button>
          </Link>
          ) : (
            <Link to="/registration">
            <Button className="get-started-btn">Get Started</Button>
          </Link>
          )}
          
        </div>

        <img
          src={require("../../assets/images/programming.png")}
          className="text-center"
        />
      </div>

      <h2 className="text-center mission-header" style={{ marginTop: "40px" }}>
        Our Mission
      </h2>
      <div className="content">
        <p className="p-one text-center">
          Our mission is to offer accessible learning methods and materials for
          students, anytime, anywhere.
        </p>
        <p className="p-two text-center">
          Explore all fields of software and web development, available in both
          video and text formats, all at your fingertips.
        </p>
      </div>
      <Cards />
      <Info />
      <h2 className="text-center mission-header">Our Ways</h2>
      <Sources />
    </>
  );
}

export default connect(null, null)(withRouter(Home));
