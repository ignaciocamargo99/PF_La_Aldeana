export const dateReducer = (state = null, action) => {
    if(action.type === 'UPDATE_DATE'){
        return action.payload
    }
    return state
} 