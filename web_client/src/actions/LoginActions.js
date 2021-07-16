//Actions
export const updateNick = (nick) =>{
    return{
        type: 'UPDATE_NICK',
        payload: nick
    }
}

export const updatePassword = (password) =>{
    return{
        type: 'UPDATE_PASSWORD',
        payload: password
    }
}

export const updateUser = (user) => {
    return{
        type: 'UPDATE_USER',
        payload: user
    }
}