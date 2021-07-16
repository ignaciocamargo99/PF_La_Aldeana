//Reducers
import {combineReducers} from 'redux';

const nickReducer = (state = '' ,action) => {
    if(action.type === 'UPDATE_NICK'){
        return action.payload
    }
    return state
}

const passwordReducer = (state = '', action) => {
    if(action.type === 'UPDATE_PASSWORD'){
        return action.payload
    }
    return state
}

const userInitialState = {nick_user:"",first_name:"",last_name:"",password:"",Rol:""}

const userReducer = (state = userInitialState, action) => {
    if(action.type === 'UPDATE_USER'){
        return action.payload
    }
    return state
}

export default combineReducers({
    nick: nickReducer,
    password: passwordReducer,
    user: userReducer
})