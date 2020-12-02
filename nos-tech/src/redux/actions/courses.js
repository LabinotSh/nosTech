import {
	ADD_TO_FAVORITES_ERROR,
	ADD_TO_FAVORITES_SUCCESS,
	FETCH_COURSES_ERROR,
	FETCH_COURSES_PENDING,
	FETCH_COURSES_SUCCESS,
	REMOVE_FROM_FAVORITES_ERROR,
	REMOVE_FROM_FAVORITES_SUCCESS,
	FETCH_ENROLLED_COURSES_SUCCESS,
	FETCH_ENROLLED_COURSES_ERROR,
	FETCH_ENROLLED_COURSES_PENDING
} from './types';
import axios from 'axios';
import { API_URL } from '../../constants/Constants';
import authHeader from '../../helpers/config';

export const fetchAllCourses = () => async (dispatch) => {
	dispatch({
		type: FETCH_COURSES_PENDING,
	});

	return axios
		.get(`${API_URL}/course`)
		.then((response) => {
			if (response.error) {
				throw response.error;
			}
			const courses = response.data;
			//console.log('Courses ' + JSON.stringify(courses));

			dispatch({
				type: FETCH_COURSES_SUCCESS,
				payload: response.data,
			});
	    	return response.data;
		})
		.catch((error) => {
			dispatch({
				type: FETCH_COURSES_ERROR,
				payload: error.response.data,
			});
		});
};

export const getEnrolledCourses = (userId) => async (dispatch) => {
	dispatch({
		type: FETCH_ENROLLED_COURSES_PENDING,
	});

	return axios.get(`${API_URL}/course/enrolled/${userId}`)
	.then(response => {
		console.log('Enrolled courses ' + JSON.stringify(response.data));

		dispatch({
			type:FETCH_ENROLLED_COURSES_SUCCESS,
			payload: response.data.courses
		})
		return response.data;
	}).catch(error => {
		dispatch({
			type:FETCH_ENROLLED_COURSES_ERROR,
			payload: error.response.data
		})
	})
}

export const addToFavorites = (uId, course) => async (dispatch) => {
	let favs = JSON.parse(localStorage.getItem('userFav'));
	let array = [...favs];
	let favList = [];
	let add = true;
	return axios
		.put(`${API_URL}/favorites/add/${uId}`, course)
		.then((response) => {
			console.log('ADDEDDDDDD');
			console.log('ddd ' + JSON.stringify(response.data));

			array.map((item) => {
				if (item === course._id) {
					add = false;
				}
			});
			if (add) {
				array.push(course._id);
				favList = [...array];
			}
			localStorage.setItem('userFav', JSON.stringify(favList));

			dispatch({
				type: ADD_TO_FAVORITES_SUCCESS,
				payload: response.data,
			});
			return response.data;
		})
		.catch((error) => {
			console.log(error);

			dispatch({
				type: ADD_TO_FAVORITES_ERROR,
				payload: error.response.data,
			});
			return error.response.data;
		});
};

export const removeFromFavorites = (uId, course) => async (dispatch) => {
	return axios
		.put(`${API_URL}/favorites/remove/${uId}`, course)
		.then((response) => {
			console.log('Removed');
			console.log('FAVORITES ' + JSON.stringify(response.data));

			dispatch({
				type: REMOVE_FROM_FAVORITES_SUCCESS,
				payload: response.data,
			});

			return response.data;
		})
		.catch((error) => {
			console.log(error);

			dispatch({
				type: REMOVE_FROM_FAVORITES_ERROR,
				payload: error.response.data,
			});
			return error.response.data;
		});
};
