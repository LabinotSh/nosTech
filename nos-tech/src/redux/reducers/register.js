import store from '../../Store';
import { REGISTER, SIGNIN } from '../actions/actions' 

const initialState = {
    email : "",
    username : "",
    password : "",
    loading : false
}

const registerReducer = ( state = initialState, action) =>  {
    switch(action.type){
        case REGISTER:
            return {
                ...state,
                email : action.email,
                password : action.password
            };
        default: 
            return state
    }
};

export default registerReducer