import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const checkAuth = (role) => {
const refreshToken = localStorage.getItem('refresh');
const token = JSON.stringify(localStorage.getItem('user'));
    if(!token || !refreshToken){
        return false;
    }
    try {
        // { exp: 12903819203 } 
        const user = jwt_decode(token); 
        const roli = user['role'];
        if (Date.now() >= (jwt_decode(refreshToken).exp)*1000) {
          return false;
        }
        if(roli!==role){
            return false;
        }
      } catch (e) {
        return false;
      }
      return true;
};

export const AdminRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props => (
         (checkAuth('admin') || checkAuth('superadmin'))
         ? <Component {...props} />
         : <Redirect to='/'/> 
        )} />
    )      
};


export const SuperAdminRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      (checkAuth('superadmin'))
      ? <Component {...props} />
      : <Redirect to='/' />
    )} />
  );
};
// export default AdminRoute;