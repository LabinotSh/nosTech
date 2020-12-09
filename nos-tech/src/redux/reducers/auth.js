import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REGISTER_REQUEST,
	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_ERROR,
	CHANGE_PASSWORD_SUCCESS,
	LOGIN_REQUEST,
} from '../actions/types';
import jwt_decode from 'jwt-decode';

let token = JSON.parse(localStorage.getItem('user'));
const initialState = token
	? { isLoggedIn: true, token: token, user: jwt_decode(token) }
	: { isLoggedIn: false, token: null, user: [] };

export const loginReducer = (state = initialState, action) => {
	// const {type, payload} = action;
	switch (action.type) {
		//new state based on the incoming action.type
		case REGISTER_REQUEST:
			return {
				...state,
				isLoggedIn: false,
				registering: true,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				registered: true,
				isLoggedIn: false,
				errors: null,
			};
		case REGISTER_FAIL:
			return {
				...state,
				registered: false,
				isLoggedIn: false,
				errors: action.payload,
			};
		case LOGIN_REQUEST:
			return {
				...state,
				isLoggedIn: false
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
				token: token,
				error: null,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				token: null,
				user: null,
				error: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				//user: null,
				token: null,
			};
		case CHANGE_PASSWORD_REQUEST:
			return {
				...state,
				pending: true,
				updateSuccess: false,
			};
		case CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				user: action.payload,
				pending: false,
				updateSuccess: true,
			};
		case CHANGE_PASSWORD_ERROR:
			return {
				...state,
				error: action.payload,
				pending: false,
				updateSuccess: false,
			};

		default:
			return state;
	}
};
