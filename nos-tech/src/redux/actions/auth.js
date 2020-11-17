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
        }

        dispatch({
            type:LOGIN_SUCCESS,
            payload: response.data.user
        });

        if(localStorage.getItem('course')) {
                
            const course = localStorage.getItem('course')
            localStorage.removeItem('course')
            history.push(`/course/${course}`)
        }

            // const role = JSON.stringify(response.data.user['role']);
            // if(role === "admin"){
            //     history.push('/admins/users')
            // }else{
            //     history.replace('/');
            // }
        // }

       //window.location.reload(false);
    
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
 if(localStorage.getItem('token')){
     localStorage.removeItem('token');
 }

 dispatch({
     type:LOGOUT
 })
 
 history.push('/login');   
 window.location.reload(false);   

};


