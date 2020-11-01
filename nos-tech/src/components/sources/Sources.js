import React from "react";
import "./sources.css";

const Sources = () => {
  return (
    <div className="our-ways">
      <div className="text-center sources-info">
        <h3 style={{ color: "black" }} className="head">
          Credible Information
        </h3>
        <p className="par">
          Udacity's mission is to train the world's workforce in the careers of
          the future. Every industry is being impacted by modern technology. Our
          mission includes providing the latest, most credible information there
          is out there, to help our students in their career path.
        </p>
      </div>
      {/* <div className="src rel"> */}
      <img
        src={require("../../assets/images/reliable-sources.jpg")}
        className="src rel"
      />
      {/* </div> */}

      <div className="text-center sources-info">
        <h3 style={{ color: "black" }} className="head">
          Reliable Sources
        </h3>
        <p className="par">
          Our platform serves as a bridge between students who are eager to
          study using the latest technologies and their usage, and the teachers
          who are the ones to provide reliable sources with top notch, quality
          information.
        </p>
      </div>
    </div>
  );
};

export default Sources;
