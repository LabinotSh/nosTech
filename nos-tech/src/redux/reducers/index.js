const {combineReducers, createrStore} 
import redux from './redu'

import loggedReducer from './loggedIn'
import registerReducer from './REGISTER'

//krijimi i konstantes combineReducers, ne menyre qe me i perfshi krejt reducers
const allReducers = combineReducers ({
    loggedIn = loggedReducer,
    register = registerReducer
})

const store = createrStore(allReducers)

export default store
