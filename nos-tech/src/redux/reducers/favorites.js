
import {
    ADD_TO_FAVORITES_SUCCESS,
    ADD_TO_FAVORITES_ERROR,
    REMOVE_FROM_FAVORITES_SUCCESS,
    REMOVE_FROM_FAVORITES_ERROR
  } from "../actions/types";
  
  
  const initialState = {
    error: null,
    favorites: []
  };
  
  export const favoritesReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (action.type) {
      case ADD_TO_FAVORITES_SUCCESS:
        return {
          ...state,
          favorites: action.payload
        };
      case ADD_TO_FAVORITES_ERROR:
          return {
            ...state,
            error: action.error
          };
      case REMOVE_FROM_FAVORITES_SUCCESS:
         return {
          ...state,
          favorites: action.payload
        };
      case REMOVE_FROM_FAVORITES_ERROR:
         return {
          ...state,
          error: action.error
         };
      default:
        return state;
    }
  };
  