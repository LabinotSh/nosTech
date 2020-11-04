//importimi i krejt reducers
import {loginReducer} from './auth';
import {combineReducers} from 'redux';
import {coursesReducer} from './courses';
import {connectRouter }  from 'connected-react-router';
import {history} from '../../helpers/history'; 
//krijimi i konstantes combineReducers, ne menyre qe me i perfshi krejt reducers

const allReducers = combineReducers({
    login: loginReducer,
    courses: coursesReducer,
    router: connectRouter(history)
})

export default allReducers;