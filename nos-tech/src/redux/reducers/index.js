//importimi i krejt reducers
import {loginReducer} from './auth';
import {combineReducers} from 'redux';
import {coursesReducer} from './courses';
import {connectRouter }  from 'connected-react-router';
import {history} from '../../helpers/history'; 
import { postCategory } from "./postCategory";
import {courseListReducer, courseDeleteReducer, courseDetailsReducer,courseUpdateReducer,courseAddStudentReducer} from './courseReducers'
import { userDeleteReducer, userListReducer,userDetailsReducer, userUpdateReducer } from './userReducers';
import {favoritesReducer} from './favorites';
//krijimi i konstantes combineReducers, ne menyre qe me i perfshi krejt reducers

const allReducers = combineReducers({
    login: loginReducer,
    courses: coursesReducer,
    favorites: favoritesReducer,
    router: connectRouter(history),
    courseList: courseListReducer,
    courseDelete:courseDeleteReducer,
    courseDetails:courseDetailsReducer,
    courseUpdate:courseUpdateReducer,
    courseAddStudent:courseAddStudentReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userDetails:userDetailsReducer,
    postCategory,
    userUpdate:userUpdateReducer

})

export default allReducers;