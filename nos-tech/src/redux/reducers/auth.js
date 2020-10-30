import {LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT, 
    REGISTER_FAIL, 
    REGISTER_SUCCESS} from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null
};
//ex..chef cooking = reducer
export const loginReducer = ( state = initialState, action) => {
    //"old version" of state equals with an initialState
    const {type, payload} = action;
    switch(action.type){
        //new state based on the incoming action.type 
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                error: null
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default: 
            return state
    }
};

