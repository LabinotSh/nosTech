import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';

const user = JSON.parse(localStorage.getItem("user"));
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
        !user
        ? <Component {...props} />
        : <Redirect to="/" /> 
     )}
    />
  );
};

const mapStateToProps = (state) => ({
	auth: state.login.isLoggedIn,
});

 //export default connect(mapStateToProps)(PublicRoute);
export default PublicRoute;
