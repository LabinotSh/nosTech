import {
  FETCH_COURSES_ERROR,
  FETCH_COURSES_PENDING,
  FETCH_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_ERROR,
  FETCH_ENROLLED_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_PENDING,
  GET_ADMIN_COURSES_REQUEST,
  GET_ADMIN_COURSES_SUCCESS,
  GET_ADMIN_COURSES_ERROR
} from "../actions/types";

const initialState = {
  pending: false,
  courses: [],
  error: null,
  enrolled: []
};

export const coursesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (action.type) {
    case FETCH_COURSES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        pending: false,
        courses: action.payload
      };
    case FETCH_COURSES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case FETCH_ENROLLED_COURSES_PENDING:
      return {
        ...state,
        pending:true
      };
    case FETCH_ENROLLED_COURSES_SUCCESS:
      return {
        ...state,
        pending:false,
        enrolled: action.payload
      };
    case FETCH_ENROLLED_COURSES_ERROR:
      return {
        ...state,
        pending:false,
        error: action.error
      }
    default:
      return state;
  }
};

export const adminCoursesReducer = (state = {courses:[]}, action) => {
  switch(action.type){
    case GET_ADMIN_COURSES_REQUEST:
      return {
        ...state,
        pending:true
      };
    case GET_ADMIN_COURSES_SUCCESS:
      return {
        ...state,
        pending:false,
        courses:action.payload
      };
    case GET_ADMIN_COURSES_ERROR:
      return {
        ...state,
        pending:false,
        courses:null,
        error: action.payload
      };
    default:
      return state;
  }
}
