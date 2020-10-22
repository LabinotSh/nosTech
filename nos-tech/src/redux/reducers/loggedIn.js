import { SIGNIN } from '../actions/actions' 
const initialState = {
    username : "",
    password : "",
    loading:false
}

const loggedReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGNIN:
            return {
                ...state,
                username : action.username,
                password : action.password
            };
    }
};

export default loggedReducer