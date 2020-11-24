import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";

const user = localStorage.getItem("user");
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
        (!user && !rest.auth)
        ? <Component {...props} />
        : <Redirect to="/" /> 
     )}
    />
  );
};

export default withRouter(PublicRoute);

