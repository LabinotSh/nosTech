//importimi i krejt reducers
import {loginReducer} from './auth';
import {combineReducers} from 'redux';
import {coursesReducer} from './courses';
import {connectRouter }  from 'connected-react-router';
import {history} from '../../helpers/history'; 
import { postCategory } from "./postCategory";
import { postTags } from "./postTags";
import {courseListReducer, courseDeleteReducer, courseDetailsReducer,courseUpdateReducer,courseAddStudentReducer,courseCreateFeedbackReducer, courseApproveReducer, courseRefuseReducer} from './courseReducers'
import { userDeleteReducer, userListReducer,userDetailsReducer, userUpdateReducer,userAddCourseReducer } from './userReducers';
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
    courseCreateFeedback:courseCreateFeedbackReducer,
    courseApprove:courseApproveReducer,
    courseRefuse:courseRefuseReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userDetails:userDetailsReducer,
    postCategory,
    postTags,
    userUpdate:userUpdateReducer,
    userAddCourse:userAddCourseReducer

})

export default allReducers;