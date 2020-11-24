import React, { Component, useState } from "react";
import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
const searchBar = (props) => {
  return (
    <div className="search-box-tp">
      <input
        className="search-text-tp"
        type="text"
        placeholder="Type to search"
        value={props.filter}
        onChange={props.onChange}
      />

      <FontAwesomeIcon icon={faSearch} id="fas" />
    </div>
  );
};

export default searchBar;
