//Reducers
export const productionDate = (state = null ,action) => {
    if(action.type === 'UPDATE_PRODUCTION_DATE'){
        return action.payload
    }
    return state
}

export const flavors = (state = [] ,action) => {
    if(action.type === 'UPDATE_FLAVORS'){
        return action.payload
    }
    return state
}

export const flavorQuantity = (state = null,action) => {
    if(action.type === 'UPDATE_FLAVOR_QUANTITY'){
        let x = state
        x[action.payload.id] = action.payload.quantity
        return x
    }
    if(action.type === 'ADD_FLAVOR_QUANTITY'){
        let x
        if(state == null){
            x = [0]
        }else{
            state.push(0)
            return state
        }
        return x
    }
    if(action.type === 'REMOVE_FLAVOR_QUANTITY'){
        let x
        if (action.payload == 0){
            x = state.slice(1,state.length)
        }else if(action.payload == state.length-1){
            state.pop()
            return state
        }else{
            x = [...state.slice(0,action.payload),...state.slice(action.payload+1,state.length)]
        }
        return x
    }
    return state
}
