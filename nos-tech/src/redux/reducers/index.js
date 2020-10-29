//importimi i krejt reducers
import {loginReducer} from './auth';
import {combineReducers} from 'redux';

//krijimi i konstantes combineReducers, ne menyre qe me i perfshi krejt reducers

const allReducers = combineReducers({
    login: loginReducer
})

export default allReducers;
