import {LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT, 
    REGISTER_FAIL, 
    REGISTER_SUCCESS,REGISTER_REQUEST} from '../actions/types';

let token = JSON.parse(localStorage.getItem('user'));
// const initialState = token
//   ? { isLoggedIn: true, token }
//   : { isLoggedIn: false, token: null
// };

const initialState = {
    token: JSON.parse(localStorage.getItem('user')),
    user: [],
    isLoggedIn: false,
    role: null
}
//ex..chef cooking = reducer
export const loginReducer = ( state = initialState, action) => {
    //"old version" of state equals with an initialState
    // const {type, payload} = action;
    switch(action.type){
        //new state based on the incoming action.type
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoggedIn:false,
                registering: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                registered:true,
                isLoggedIn:false,
                errors:null
            };
        case REGISTER_FAIL:
            return {
                ...state,
                registered:false,
                isLoggedIn:false,
                errors: action.payload
            }; 
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                token: token,
                error: null,
                role: action.payload.role
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token:null,
                user: null,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                //user: null,
                token: null
            };
        default: 
            return state
    }
};

