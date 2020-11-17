import {
  ADD_TO_FAVORITES_ERROR,
  ADD_TO_FAVORITES_SUCCESS,
  FETCH_COURSES_ERROR,
  FETCH_COURSES_PENDING,
  FETCH_COURSES_SUCCESS,
  REMOVE_FROM_FAVORITES_ERROR,
  REMOVE_FROM_FAVORITES_SUCCESS,
} from "./types";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useState } from "react";


export const fetchAllCourses = () => async (dispatch) => {

     dispatch({
       type:FETCH_COURSES_PENDING,
     })

    return axios
    .get(`${API_URL}/course`)
    .then((response) => {
      if (response.error) {
        throw response.error;
      }

      const courses = response.data;
      console.log("Courses " + JSON.stringify(courses));

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

const config = { headers: {'Content-Type': 'application/json'} };
export const addToFavorites = (cId, user) => async (dispatch) => {
    axios
    .put(`${API_URL}/favorites/add/${cId}`, user)
    .then((response) => {
      console.log("ADDEDDDDDD");
      console.log('ddd ' + JSON.stringify(response.data));

      dispatch({
        type: ADD_TO_FAVORITES_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem("favs", JSON.stringify(response.data.favorites));
      //return response.data;
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: ADD_TO_FAVORITES_ERROR,
        payload: error.response.data,
      });
    });
};


export const removeFromFavorites = (cId , user) => async (dispatch) => {
    
    axios
    .put(`${API_URL}/favorites/remove/${cId}`, user, config)
    .then((response) => {
        console.log("Removed");
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
      });
  };
