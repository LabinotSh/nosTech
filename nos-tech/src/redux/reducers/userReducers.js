import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_ADD_COURSE_REQUEST,
    USER_ADD_COURSE_SUCCESS,
    USER_ADD_COURSE_FAIL
    
} from '../actions/types'

export const userListReducer = (state = { users: []}, action) => {
    
    switch(action.type) {
        case USER_LIST_REQUEST:
            return {...state,loading: true};
        case USER_LIST_SUCCESS:
            return {...state,loading: false, users: action.payload};
        case USER_LIST_FAIL:
            return {...state,loading: false, error: action.payload};
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_DELETE_REQUEST:
            return {...state,loading: true};
        case USER_DELETE_SUCCESS:
            return {...state,loading: false, success:true};
        case USER_DELETE_FAIL:
            return {...state,loading: false, error: action.payload};
        case USER_DELETE_RESET:
            return state = {}    
        default:
            return state
    }
}

export const userDetailsReducer = (state = {user:{}}, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true, ...state}
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload, success:true}  
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
            default:
                return state    
    }
}

export const userUpdateReducer = (state = {user:{}}, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return {...state,loading: true, success:false}
        case USER_UPDATE_SUCCESS:
            return {...state,loading: false,success:true, user: action.payload}  
        case USER_UPDATE_FAIL:
            return {...state,loading: false, error: action.payload};
        case USER_UPDATE_RESET:
            return {user:{}}    
            default:
                return state    
    }
}

export const userAddCourseReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_ADD_COURSE_REQUEST:
            return {loading: true, ...state}
        case USER_ADD_COURSE_SUCCESS:
            return {loading: false,success:true}  
        case USER_ADD_COURSE_FAIL:
            return {loading: false, error: action.payload};
            default:
                return state    
    }
}
