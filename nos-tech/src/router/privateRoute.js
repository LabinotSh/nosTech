import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const checkAuth = () => {
    const token = localStorage.getItem('user');
    const refreshToken = localStorage.getItem('refresh');

    if(!token || !refreshToken){
        return false;
    }

    try {
        // { exp: 12903819203 }
        const { exp } = jwt_decode(refreshToken);
    
        if (exp < new Date.now() /1000) {
          return false;
        }
      } catch (e) {
        return false;
      }
    
      return true;
};

const PrivateRoute = ({component:Component, ...rest}) => {
    const user = localStorage.getItem('user');

    return(
        <Route {...rest} render={(props) => {
            (checkAuth() || !user) 
            ? <Component {...props} />
            : <Redirect to='/login' />
        }} />
    )
}

export default PrivateRoute;