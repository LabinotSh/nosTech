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
    COURSE_UPDATE_FAIL
} from '../actions/types'
import axios from 'axios';

export const listCourses = () => async (dispatch) => {
    try {
        dispatch({type: COURSE_LIST_REQUEST})

        const {data} = await axios.get('/api/course')
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