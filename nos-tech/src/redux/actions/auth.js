import {LOGIN_SUCCESS,
       LOGIN_FAIL, 
       LOGOUT, 
       REGISTER_FAIL, 
       REGISTER_SUCCESS} from './types';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/user'; 

export const login = (email, password) => (dispatch) => {
    return axios.post(API_URL+'/login', {email, password})
    .then((response) => {
        if(response.data.token){
            console.log('USER ' + JSON.stringify(response.data.token));
            const user = response.data.token;
            localStorage.setItem('user', JSON.stringify(user));
        }

        dispatch({
            type:LOGIN_SUCCESS,
            payload: response.data.user
        });

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

 dispatch({
     type:LOGOUT
 })
};