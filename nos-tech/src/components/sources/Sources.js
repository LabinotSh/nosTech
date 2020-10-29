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
          Sed vel magna mollis, molestie nunc id, porttitor nibh. Proin justo
          sem, aliquet eget semper elementum, cursus non tortor. Pellentesque
          vitae fringilla elit. Duis ultrices odio sapien, non placerat lacus
          mattis at. In ultrices euismod quam, eget posuere odio vestibulum et.
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
          Sed vel magna mollis, molestie nunc id, porttitor nibh. Proin justo
          sem, aliquet eget semper elementum, cursus non tortor. Pellentesque
          vitae fringilla elit. Duis ultrices odio sapien, non placerat lacus
          mattis at. In ultrices euismod quam, eget posuere odio vestibulum et.
        </p>
      </div>
    </div>
  );
};

export default Sources;
