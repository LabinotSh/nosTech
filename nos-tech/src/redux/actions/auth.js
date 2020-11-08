import {LOGIN_SUCCESS,
       LOGIN_FAIL, 
       LOGOUT, 
       REGISTER_FAIL,
       REGISTER_REQUEST, 
       REGISTER_SUCCESS} from './types';
import axios from 'axios';
import responsive from '../../constants/carouselResponsive';
import {history} from '../../helpers/history';

const API_URL = 'http://localhost:3001/api/user'; 


export const register = (name, surname, email, password, role, username) => (dispatch) => {

    dispatch({
        type:REGISTER_REQUEST
    });
    
    return axios.post(API_URL+'/register', {name, surname, email, password, role, username})
    .then(response => {
        if(response.error){
            throw(response.error);
        }
       const user = JSON.stringify(response.data);
       console.log('USER ' + user);

        dispatch({
            type:REGISTER_SUCCESS,
        });

        //history.push('/login');
        //window.location.reload(false);

        return response;
    }).catch(error => {
        console.log('Error: ' + error.response.data);

        dispatch({
            type:REGISTER_FAIL,
            payload: error.response.data
        });
        return error.response.data;
    });

};


export const login = (username, password) => (dispatch) => {
    return axios.post(API_URL+'/login', {username, password})
    .then((response) => {
        if(response.data.token){
            console.log('USER ' + JSON.stringify(response.data.token));
            const user = response.data.token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('refresh', JSON.stringify(response.data.refreshToken));

            const role = JSON.stringify(response.data.user['role'])
            const ro = JSON.parse(role);

            if(ro === "admin"){
                history.push('/admins/users')
            }else{
                history.push('/');
            }
        }


        dispatch({
            type:LOGIN_SUCCESS,
            payload: response.data.user
        });

       window.location.reload(false);

        return response;
    }).catch(error => {
        console.log('Error: ' + error.response.data);

        dispatch({
            type:LOGIN_FAIL,
            payload: error.response.data
        });
        return error.response.data;

    })
}

export const logout = () => (dispatch) => {
 localStorage.removeItem('user');
 localStorage.removeItem('refresh');

 dispatch({
     type:LOGOUT
 })
 

  history.push('/login');   
  window.location.reload(false);    



};


