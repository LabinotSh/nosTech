import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const user = localStorage.getItem('user');

export const HeartFull = (props) => {
//   if(!user) return null;
  return (
    <FontAwesomeIcon
      key={props.key}
      icon={faHeart}
      size="2x"
      color={"#fc4563"}
      style={{ marginRight: "5px", marginTop: "3px" }}
       onClick={props.onClick}
    />
  );

};


export const HeartEmpty = (props) => {
    // if(!user) return null;
    return (
        <FontAwesomeIcon
          key={props.key}
          icon={farHeart}
          size="2x"
          color={"#fc4563"}
          style={{ marginRight: "5px", marginTop: "3px" }}
          onClick={props.onClick}
        />
      );
};
