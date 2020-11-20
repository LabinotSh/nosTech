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
    COURSE_CREATE_FEEDBACK_SUCCESS,
    COURSE_APPROVE_REQUEST,
    COURSE_APPROVE_FAIL,
    COURSE_APPROVE_SUCCESS,
    COURSE_REFUSE_REQUEST,
    COURSE_REFUSE_FAIL,
    COURSE_REFUSE_SUCCESS
} from '../actions/types'
import axios from 'axios';

export const listCourses = () => async (dispatch) => {
    try {
        dispatch({type: COURSE_LIST_REQUEST})

        const {data} = await axios.get('/api/course')
        console.log('COURSE ' + data);
        dispatch({
            type:COURSE_LIST_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type:COURSE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const deleteCourse = (id) => async (dispatch) => {
    try {
        dispatch({type: COURSE_DELETE_REQUEST})

         await axios.delete(`/api/course/${id}`)
        dispatch({
            type:COURSE_DELETE_SUCCESS,
            
        })
    }catch(error) {
        dispatch({
            type:COURSE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const approveCourse = (id) => async (dispatch) => {
    try {
        dispatch({type: COURSE_APPROVE_REQUEST})

         await axios.put(`/api/course/` + id, {status:1})
        dispatch({
            type:COURSE_APPROVE_SUCCESS,
            
        })
    }catch(error) {
        dispatch({
            type:COURSE_APPROVE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const refuseCourse = (id) => async (dispatch) => {
    try {
        dispatch({type: COURSE_REFUSE_REQUEST})

         await axios.put(`/api/course/` + id, {status:2})
        dispatch({
            type:COURSE_REFUSE_SUCCESS,
            
        })
    }catch(error) {
        dispatch({
            type:COURSE_REFUSE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listCourseDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: COURSE_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/course/${id}`)
        dispatch({
            type:COURSE_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type:COURSE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const updateCourse = (course) => async (dispatch) => {
    try {
        dispatch({type: COURSE_UPDATE_REQUEST})

        const {data} = await axios.put(`/api/course/${course._id}`,course)
        dispatch({
            type:COURSE_UPDATE_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type:COURSE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const addStudentToCourse = (id,user) => async (dispatch) => {
    try {
        dispatch({type: COURSE_ADD_STUDENT_REQUEST})

        await axios.post(`/api/course/${id}/addUser`,user)
        dispatch({
            type:COURSE_ADD_STUDENT_SUCCESS,
            
        })
    }catch(error) {
        dispatch({
            type:COURSE_ADD_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const createCourseFeedback = (id,feedback) => async (dispatch) => {
    try {
        dispatch({type: COURSE_CREATE_FEEDBACK_REQUEST})

        await axios.post(`/api/course/${id}/addReview`,feedback)
        dispatch({
            type:COURSE_CREATE_FEEDBACK_SUCCESS,
            
        })
    }catch(error) {
        dispatch({
            type:COURSE_CREATE_FEEDBACK_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}
