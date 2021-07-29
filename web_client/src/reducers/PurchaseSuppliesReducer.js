//Reducers
export const purchaseNumber = (state = 1 ,action) => {
    if(action.type === 'UPDATE_PURCHASE_NUMBER'){
        return action.payload
    }
    return state
}

export const purchaseDate = (state = null ,action) => {
    if(action.type === 'UPDATE_PURCHASE_DATE'){
        return action.payload
    }
    return state
}

export const purchaseSupplier = (state = null ,action) => {
    if(action.type === 'UPDATE_PURCHASE_SUPPLIER'){
        return action.payload
    }
    return state
}

export const purchaseSupplies = (state = [] ,action) => {
    if(action.type === 'UPDATE_PURCHASE_SUPPLIES'){
        return action.payload
    }
    return state
}

export const purchaseQuantity = (state = null,action) => {
    if(action.type === 'UPDATE_PURCHASE_QUANTITY'){
        let x = state
        x[action.payload.id] = parseInt(action.payload.quantity)
        return x
    }
    if(action.type === 'ADD_PURCHASE_QUANTITY'){
        let x
        if(state == null){
            x = [0]
        }else{
            state.push(0)
            return state
        }
        return x
    }
    if(action.type === 'REMOVE_PURCHASE_QUANTITY'){
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
    if(action.type === 'RESET_PURCHASE_QUANTITY'){
        return null
    }
    return state
}

export const purchasePrice = (state = null,action) => {
    if(action.type === 'UPDATE_PURCHASE_PRICES'){
        let x = state
        x[action.payload.id] = parseInt(action.payload.price)
        return x
    }
    if(action.type === 'ADD_PURCHASE_PRICES'){
        let x
        if(state == null){
            x = [0]
        }else{
            state.push(0)
            return state
        }
        return x
    }
    if(action.type === 'REMOVE_PURCHASE_PRICES'){
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
    if(action.type === 'RESET_PURCHASE_PRICES'){
        return null
    }
    return state
}

export const purchaseSubtotal = (state = null,action) => {
    if(action.type === 'UPDATE_PURCHASE_SUBTOTAL'){
        let x = state
        x[action.payload.id] = parseInt(action.payload.subtotal)
        return x
    }
    if(action.type === 'ADD_PURCHASE_SUBTOTAL'){
        let x
        if(state == null){
            x = [0]
        }else{
            state.push(0)
            return state
        }
        return x
    }
    if(action.type === 'REMOVE_PURCHASE_SUBTOTAL'){
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
    if(action.type === 'RESET_PURCHASE_SUBTOTAL'){
        return null
    }
    return state
}

export const purchaseTotal = (state = 0 ,action) => {
    if(action.type === 'UPDATE_PURCHASE_TOTAL'){
        return action.payload
    }
    return state
}