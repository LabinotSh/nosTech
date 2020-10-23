import { createStore, combineReducers, applyMiddleware } from 'redux'
import  thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {reducer as formReducer } from 'redux-form'

//a bohet qishtu combine reducersa veq duhet ni konstante me bo te combine reducers..
// const rootReducer = combineReducers
export const rootReducer = combineReducers({
  form: formReducer
})

 const initialState = {}

 const middleWare = [thunk]

 const store = createStore(
    formReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleWare))
 ) 

 export default store