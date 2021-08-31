//Reducers
export const nickReducer = (state = '' ,action) => {
    if(action.type === 'UPDATE_NICK'){
        return action.payload
    }
    return state
}

export const passwordReducer = (state = '', action) => {
    if(action.type === 'UPDATE_PASSWORD'){
        return action.payload
    }
    return state
}

const userInitialState = {nick_user:"",first_name:"",last_name:"",password:"",Rol:""}

export const userReducer = (state = userInitialState, action) => {
    if(action.type === 'UPDATE_USER'){
        return action.payload
    }
    return state
}

export const permissionsReducer = (state = ['Inicio'] , action) => {
    if(action.type === 'UPDATE_PERMISSIONS'){
        return [...state,action.payload]
    }
    return state
}
