import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const user = localStorage.getItem("user");
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
        user 
        ? <Redirect to="/" /> 
        : <Component {...props} />
     )}
    />
  );
};

export default PublicRoute;

