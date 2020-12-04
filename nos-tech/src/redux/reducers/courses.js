import {
  FETCH_COURSES_ERROR,
  FETCH_COURSES_PENDING,
  FETCH_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_ERROR,
  FETCH_ENROLLED_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_PENDING
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
