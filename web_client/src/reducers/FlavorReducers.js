//Reducers

export const productionFlavorsReducer = (state = [] ,action) => {
    if(action.type === 'UPDATE_PRODUCTION_FLAVORS'){
        return action.payload
    }
    return state
}