export const productsReducer = (state = [], action) => {
    if(action.type === 'UPDATE_PRODUCTS'){
        return action.payload
    }
    return state
}