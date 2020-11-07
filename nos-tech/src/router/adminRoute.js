import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const checkAuth = (role) => {
    const token = JSON.stringify(localStorage.getItem('user'));
    const refreshToken = localStorage.getItem('refresh');

    if(!token || !refreshToken){
        return false;
    }

    try {
        // { exp: 12903819203 }
        const { exp } = jwt_decode(refreshToken);
        const user = jwt_decode(token);
        role = user['role'];

    
        if (exp < new Date.now() /1000) {
          return false;
        }
        if(role!=='admin'){
            return false;
        }
      } catch (e) {
        return false;
      }
    
      return true;
};

const AdminRoute = ({component: Component, ...rest}) => {
    const user = localStorage.getItem('user');
    return(
        <Route {...rest} render={props => (
         (checkAuth('admin') && !user)
         ? <Component {...props} />
         : <Redirect to='/'/> 
        )} />
    )      
};

export default AdminRoute;