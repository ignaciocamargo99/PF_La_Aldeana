export const payTypeDeliveryReducer = (state = 'Efectivo', action) => {
    if(action.type === 'UPDATE_PAY_TYPE_DELIVERY'){
        return action.payload
    }
    return state
}

export const amountDeliveryReducer = (state = '', action) => {
    if(action.type === 'UPDATE_AMOUNT'){
        return action.payload
    }
    return state
}

export const errorAmountDeliveryReducer = (state = true, action) => {
    if(action.type === 'UPDATE_ERROR_AMOUNT'){
        return action.payload
    }
    return state
}

export const cellphoneDeliveryReducer = (state = '', action) => {
    if(action.type === 'UPDATE_CELLPHONE'){
        return action.payload
    }
    return state
}

export const errorCellphoneDeliveryReducer = (state = true, action) => {
    if(action.type === 'UPDATE_ERROR_CELLPHONE'){
        return action.payload
    }
    return state
}

export const namesDeliveryReducer = (state = '', action) => {
    if(action.type === 'UPDATE_NAMES'){
        return action.payload
    }
    return state
}

export const errorNamesDeliveryReducer = (state = true, action) => {
    if(action.type === 'UPDATE_ERROR_NAMES'){
        return action.payload
    }
    return state
}

export const totalDeliveryReducer = (state = 0, action) => {
    if(action.type === 'SUM_TOTAL'){
        return state + action.payload
    }
    if(action.type === 'SUBTRACT_TOTAL'){
        return state - action.payload
    }
    return state
}

export const streetDeliveryReducer = (state = '', action) => {
    if(action.type === 'UPDATE_STREET'){
        return action.payload
    }
    return state
}

export const errorStreetDeliveryReducer = (state = true, action) => {
    if(action.type === 'UPDATE_ERROR_STREET'){
        return action.payload
    }
    return state
}

export const streetNumberDeliveryReducer = (state = '', action) => {
    if(action.type === 'UPDATE_STREET_NUMBER'){
        return action.payload
    }
    return state
}

export const errorStreetNumberDeliveryReducer = (state = true, action) => {
    if(action.type === 'UPDATE_ERROR_STREET_NUMBER'){
        return action.payload
    }
    return state
}

export const detailsDeliveryReducer = (state = [], action) => {
    if(action.type === 'ADD_DETAIL_DELIVERY'){
        state.push(action.payload)
        return state
    }
    if(action.type === 'DELETE_DETAIL_DELIVERY'){
        let rta = state.slice(0,action.payload).concat(state.slice(action.payload+1,state.length))
        return rta
    }
    if(action.type === 'UPDATE_DETAIL_DELIVERY'){
        let rta = state
        rta[action.payload.i] = action.payload.detail
        return rta
    }
    if(action.type === 'RESET_DETAIL_DELIVERY'){
        return []
    }
    return state
}


export const flavorsProductDeliveryReducer = (state = [], action) => {
    if(action.type === 'UPDATE_ALL_FLAVORS_PRODUCT'){
        return action.payload
    }
    if(action.type === 'UPDATE_FLAVORS_PRODUCT'){
        let rta = state
        rta[action.payload.i] = action.payload.flavorsProduct
        return rta
    }
    if(action.type === 'ADD_FLAVORS_PRODUCT'){
        let rta = state
        rta[action.payload.i].push(action.payload.flavor)
        return rta
    }
    if(action.type === 'DELETE_FLAVORS_PRODUCT'){
        let rta = state
        let flavorsProduct = rta[action.payload.i].slice(0,action.payload.j).concat(rta[action.payload.i].slice(action.payload.j+1,rta[action.payload.i]))
        rta[action.payload.i] = flavorsProduct
        return rta
    }
    return state
}

export const productsQuantitiesDeliveryReducer = (state = [], action) => {
    if(action.type === 'UPDATE_DELIVERY_PRODUCT_QUANTITY'){
        let aux = state
        aux[action.payload.i] = action.payload.productQuantity
        return aux
    }
    if(action.type === 'UPDATE_DELIVERY_PRODUCTS_QUANTITIES'){
        return action.payload
    }
    return state
}

export const clientDeliveryReducer = (state = null, action) => {
    if(action.type === 'UPDATE_DELIVERY_CLIENT'){
        return action.payload
    }
    return state
}

export const productsNotStockDeliveryReducer = (state = [], action) => {
    if(action.type === 'UPDATE_DELIVERY_PRODUCTS_NOT_STOCK'){
        return action.payload
    }
    return state
}
