export const flavorsDispatchDate = (state = null ,action) => {
    if(action.type === 'UPDATE_FLAVORS_DATE'){
        return action.payload
    }
    return state
}