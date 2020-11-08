import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./signin.css";

const SignInIcon = (props) => {
  return (
    <div className="fadeIn">
      <FontAwesomeIcon icon={faSignInAlt} size={props.size} />
    </div>
  );
};

export default SignInIcon;
