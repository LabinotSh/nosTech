import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom';

const PublicRoute = ({component:Component, ...rest}) => {

    const user = localStorage.getItem('user');

    return(
        <Route {...rest} render={(props) => (
            !user 
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
    );
}

export default PublicRoute;