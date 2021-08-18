//Reducers
export const location = (state = 0 ,action) => {
    if(action.type === 'UPDATE_PURCHASE_NUMBER'){
        return action.payload
    }
    return state
}