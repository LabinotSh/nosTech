import React from "react";
import "./home.css";
import Cards from "../../components/card/Cards";
import Sources from "../../components/sources/Sources";
import Info from "../../components/search-info/SearchInfo";

function Home() {
  return (
    <>
      <div className="programming">
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
      <h2 className="text-center mission-header">Our Ways</h2>
      <Sources />
      <Info />
    </>
  );
}

export default Home;
