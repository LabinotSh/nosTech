import {FETCH_COURSES_ERROR,
    FETCH_COURSES_PENDING,
    FETCH_COURSES_SUCCESS} from './types';
import axios from 'axios';

const API_URL='http://localhost:3001/api/course';

export const fetchAllCourses = () => (dispatch) => {

    dispatch({
        type:FETCH_COURSES_PENDING
    })

    return axios.get(API_URL).then((response) => {
        if(response.error){
            throw(response.error);
        }

        const courses = response.data;
        console.log('Courses ' + JSON.stringify(courses));

        dispatch({
            type:FETCH_COURSES_SUCCESS,
            payload: response.data.courses
        })

        return response.data;
    }).catch(error => {
        dispatch({
            type:FETCH_COURSES_ERROR,
            payload: error.response.data
        })
    });

};
