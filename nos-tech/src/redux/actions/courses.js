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


export const fetchAllCourses = () => (dispatch) => {

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

export const addToFavorites = (id, props) => (dispatch) => {
  let array = [];
  let favList = [];
  let add = true;
  return axios
    .put(`${API_URL}/course/fav/add/${id}`)
    .then((response) => {
      console.log("ADDEDDDDDD");
      console.log('ddd ' + JSON.stringify(response.data));

      array.map((item) => {
        if (item === props) {
          add = false;
        }
      });
      if (add) {
        array.push(props);
        favList = [...array];
      }

      dispatch({
        type: ADD_TO_FAVORITES_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem("favs", favList);
      return response.data;
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: ADD_TO_FAVORITES_ERROR,
        payload: error.response.data,
      });
    });
};


export const removeFromFavorites = (id, props) => (dispatch) => {
    let array = [];
    let remove = false;
    return axios
    .put(`${API_URL}/course/fav/remove/${id}`)
    .then((response) => {
        console.log("REmoved");
        console.log('ddd ' + JSON.stringify(response.data));
  
        array.map((item) => {
          if (item === props) {
            remove = true;
          }
        });
        if (remove) {
          array.pop(props);
        }
  
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
