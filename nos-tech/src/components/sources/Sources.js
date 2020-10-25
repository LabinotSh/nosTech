import React from "react";
import "./sources.css";

const Sources = () => {
  return (
    <div className="our-ways">
      <div className="src">
        <img src={require("../../assets/images/reliable-sources.jpg")} />
      </div>

      <div className="text-center sources-info">
        <h2 style={{ color: "black" }}>Reliable Sources</h2>
        <p>
          Sed vel magna mollis, molestie nunc id, porttitor nibh. Proin justo
          sem, aliquet eget semper elementum, cursus non tortor. Pellentesque
          vitae fringilla elit. Duis ultrices odio sapien, non placerat lacus
          mattis at. In ultrices euismod quam, eget posuere odio vestibulum et.
          Aliquam in velit ut metus condimentum blandit vitae quis metus. Etiam
          pulvinar nisi tincidunt metus rhoncus, et tincidunt sem porttitor.
        </p>
      </div>
    </div>
  );
};

export default Sources;
