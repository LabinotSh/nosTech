import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DELETE_REQUEST,
    COURSE_DELETE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_ADD_STUDENT_REQUEST,
    COURSE_ADD_STUDENT_FAIL,
    COURSE_ADD_STUDENT_SUCCESS,
    COURSE_CREATE_FEEDBACK_REQUEST,
    COURSE_CREATE_FEEDBACK_FAIL,
    COURSE_CREATE_FEEDBACK_SUCCESS

} from '../actions/types'


export const courseListReducer = (state = { courses: []}, action) => {
    switch(action.type) {
        case COURSE_LIST_REQUEST:
            return {...state,loading: true, courses: []};
        case COURSE_LIST_SUCCESS:
            return {...state,loading: false, courses: action.payload};
        case COURSE_LIST_FAIL:
            return {...state,loading: false, error: action.payload};
        default:
            return state
    }
}

export const courseDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case COURSE_DELETE_REQUEST:
            return {...state,loading: true};
        case COURSE_DELETE_SUCCESS:
            return {...state,loading: false, success:true};
        case COURSE_DELETE_FAIL:
            return {...state,loading: false, error: action.payload};
        default:
            return state
    }
}

export const courseDetailsReducer = (state = {course:{ videos: []}}, action) => {
    switch(action.type) {
        case COURSE_DETAILS_REQUEST:
            return {loading: true, ...state}
        case COURSE_DETAILS_SUCCESS:
            return {loading: false, course: action.payload, success:true}  
        case COURSE_DETAILS_FAIL:
            return {loading: false, error: action.payload};
            default:
                return state    
    }
}

export const courseUpdateReducer = (state = {course:{videos: [], users:[]}}, action) => {
    switch(action.type) {
        case COURSE_UPDATE_REQUEST:
            return {...state,loading: true, success:false}
        case COURSE_UPDATE_SUCCESS:
            return {...state,loading: false,success:true, course: action.payload}  
        case COURSE_UPDATE_FAIL:
            return {...state,loading: false, error: action.payload};
            default:
                return state    
    }
}

export const courseAddStudentReducer = (state = {}, action) => {
    switch(action.type) {
        case COURSE_ADD_STUDENT_REQUEST:
            return {loading: true, ...state}
        case COURSE_ADD_STUDENT_SUCCESS:
            return {loading: false,success:true}  
        case COURSE_ADD_STUDENT_FAIL:
            return {loading: false, error: action.payload};
            default:
                return state    
    }
}

export const courseCreateFeedbackReducer = (state = {}, action) => {
    switch(action.type) {
        case COURSE_CREATE_FEEDBACK_REQUEST:
            return {loading: true, ...state}
        case COURSE_CREATE_FEEDBACK_SUCCESS:
            return {loading: false,success:true}  
        case COURSE_CREATE_FEEDBACK_FAIL:
            return {loading: false, error: action.payload};
            default:
                return state    
    }
}

