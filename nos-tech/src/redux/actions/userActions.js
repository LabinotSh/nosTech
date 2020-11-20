import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_ADD_COURSE_REQUEST,
    USER_ADD_COURSE_SUCCESS,
    USER_ADD_COURSE_FAIL
} from '../actions/types'
import axios from 'axios'

export const listUsers = () => async (dispatch) => {
    try {
        dispatch({type: USER_LIST_REQUEST})

        const {data} = await axios.get('/api/user')
        dispatch({
            type:USER_LIST_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DELETE_REQUEST})

         await axios.delete(`/api/user/${id}`)
        dispatch({
            type:USER_DELETE_SUCCESS,
            
        })
    }catch(error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/user/${id}`)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({type: USER_UPDATE_REQUEST})

        const {data} = await axios.put(`/api/user/${user._id}`,user)
        dispatch({
            type:USER_UPDATE_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const addCourseToStudent = (id,course) => async (dispatch) => {
    try {
        dispatch({type: USER_ADD_COURSE_REQUEST})

        await axios.post(`/api/user/${id}/addCourse`,course)
        dispatch({
            type:USER_ADD_COURSE_SUCCESS,
            
        })
    }catch(error) {
        dispatch({
            type:USER_ADD_COURSE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}