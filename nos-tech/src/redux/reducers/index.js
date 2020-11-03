//importimi i krejt reducers
import {loginReducer} from './auth';
import {combineReducers} from 'redux';
import {coursesReducer} from './courses';

//krijimi i konstantes combineReducers, ne menyre qe me i perfshi krejt reducers

const allReducers = combineReducers({
    login: loginReducer,
    courses: coursesReducer
})

export default allReducers;