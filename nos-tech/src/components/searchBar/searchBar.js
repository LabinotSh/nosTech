import React, { Component, useState } from 'react';
import './searchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {

    return (
        <div className="float-right">
        <div className="input-group mt-3">
              <input
                type="text"
                placeholder="Search courses..."
                className="search-form"
                value={props.filter}
                onChange={props.onChange}
              />
              <button className="btn btn-default search-btn">
                <FontAwesomeIcon icon={faSearch} color={'#fff'} />
              </button>
            </div>
            </div>
    );
}

export default SearchBar;
