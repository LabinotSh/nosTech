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
          Sed vel magna mollis, molestie nunc id, porttitor nibh. Proin justo
          sem, aliquet eget semper elementum, cursus non tortor. Pellentesque
          vitae fringilla elit. Duis ultrices odio sapien, non placerat lacus
          mattis at. In ultrices euismod quam, eget posuere odio vestibulum et.
          Aliquam in velit ut metus condimentum blandit vitae quis metus. Etiam
          pulvinar nisi tincidunt metus rhoncus, et tincidunt sem porttitor.
        </p>

        <Link to="/courses" className="link">
          <Button className="availableCourses">Available Courses</Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchInfo;
