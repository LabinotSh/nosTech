import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
	LOGIN_REQUEST
} from './types';
import axios from 'axios';
import { history } from '../../helpers/history';
import { API_URL } from '../../constants/Constants';
import authHeader from '../../helpers/config';
import jwt_decode from 'jwt-decode';

export const register = (name, surname, email, password, role, username) => (dispatch) => {
	dispatch({
		type: REGISTER_REQUEST,
	});

	return axios
		.post(API_URL + '/user/register', { name, surname, email, password, role, username })
		.then((response) => {
			if (response.error) {
				throw response.error;
			}
			const user = JSON.stringify(response.data);
			console.log('USER ' + user);

			dispatch({
				type: REGISTER_SUCCESS,
			});
			return response;
		})
		.catch((error) => {
			console.log('Error: ' + error.response.data);

			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data,
			});
			return error.response.data;
		});
};

export const login = (username, password) => async (dispatch) => {

	dispatch({
		type: LOGIN_REQUEST
	})

    axios
		.post(API_URL + '/user/login', { username, password })
		.then((response) => {
			if (response.data.token) {
				console.log('USER ' + JSON.stringify(response.data));
				const user = response.data.token;
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('refresh', JSON.stringify(response.data.refreshToken));
				localStorage.setItem('userFav', JSON.stringify(response.data.favorites));
			}
			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data.user,
			});

			setTimeout(() => {
				if (response.data.user.role === 'admin') {
					history.push('/admins/dashboard');
				} else if (response.data.user.role === 'user') {
					history.push('/');
				} else {
					history.push('/admins/users');
				}
			}, 800);

			if (localStorage.getItem('course')) {
				const course = localStorage.getItem('course');
				localStorage.removeItem('course');
				history.push(`/course/${course}`);
			}
			return response.data;
		})
		.catch((error) => {
			console.log('Error: ' + error.response.data);
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data,
			});
			return error.response.data;
		});
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('user');
	localStorage.removeItem('refresh');
	localStorage.removeItem('userFav');

	dispatch({
		type: LOGOUT,
	});

	history.push('/login');
	window.location.reload(false);
};

export const changePassword = (userId, currentPassword, newPassword) => (dispatch) => {
	dispatch({
		type: CHANGE_PASSWORD_REQUEST,
	});

	return axios
		.put(`${API_URL}/user/${userId}/newPassword`, { currentPassword, newPassword }, { headers: authHeader() })
		.then((response) => {
            console.log('Updated' + JSON.stringify(response.data));
            localStorage.setItem('user', JSON.stringify(response.data.newUser))	
			dispatch({
				type: CHANGE_PASSWORD_SUCCESS,
				payload: jwt_decode(response.data.newUser),
            });
			return response;
		}).catch(error => {
            dispatch({
                type: CHANGE_PASSWORD_ERROR,
                payload: error.response.data
            })
            return error.response.data;
        })
};
