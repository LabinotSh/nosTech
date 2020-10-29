import  thunk from 'redux-thunk'
import {reducer as formReducer } from 'redux-form';
import allReducers from './redux/reducers/index';
import { createStore, compose, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// const rootReducer = combineReducers

 const initialState = {}

 const middleWare = [thunk]

 const store = createStore( 
    allReducers, 
    composeWithDevTools(applyMiddleware(...middleWare))
 ) 

 export default store;