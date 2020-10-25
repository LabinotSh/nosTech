import React from "react";
import "./searchinfo.css";
import { Button } from "react-bootstrap";

const SearchInfo = () => {
  return (
    <div className="search-info">
      <div className="text-center search-information">
        <h2 style={{ color: "black" }}>Easily Obtainable Information</h2>
        <p>
          Sed vel magna mollis, molestie nunc id, porttitor nibh. Proin justo
          sem, aliquet eget semper elementum, cursus non tortor. Pellentesque
          vitae fringilla elit. Duis ultrices odio sapien, non placerat lacus
          mattis at. In ultrices euismod quam, eget posuere odio vestibulum et.
          Aliquam in velit ut metus condimentum blandit vitae quis metus. Etiam
          pulvinar nisi tincidunt metus rhoncus, et tincidunt sem porttitor.
        </p>
        <Button className="availableCourses">Available Courses</Button>
      </div>
      <div className="src">
        <img src={require("../../assets/images/search-illustration.jpg")} />
      </div>
    </div>
  );
};

export default SearchInfo;
