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
    
      if (Date.now() >= (jwt_decode(refreshToken).exp)*1000) {
          return false;
      }
        console.log(jwt_decode(token).exp);
      } catch (e) {
        return false;
      }
    
      return true;
};

const PrivateRoute = ({component:Component, ...rest}) => {
    const user = localStorage.getItem('user');

    return(
        <Route {...rest} render={(props) => (
            (checkAuth()) 
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    )
}

export default PrivateRoute;