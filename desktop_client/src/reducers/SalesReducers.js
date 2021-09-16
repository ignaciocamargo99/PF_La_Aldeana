export const productsReducer = (state = [], action) => {
    if(action.type === 'UPDATE_PRODUCTS'){
        return action.payload
    }
    return state
}

export const productsFilteredReducer = (state = [], action) => {
    if(action.type === 'UPDATE_PRODUCTS_FILTERED'){
        return action.payload
    }
    return state
}

export const detailProductsReducer = (state = [], action) => {
    let pos;
    let aux;
    switch (action.type) {
        case 'UPDATE_DETAIL_PRODUCTS': 
            return [...state, action.payload]
        case 'UPDATE_DETAIL_PRODUCTS_MODIFY':
            pos = state.findIndex(n => n.id_product === action.payload.id_product);
            aux = state;
            aux[pos] = action.payload;
            return aux
        case 'UPDATE_DETAIL_PRODUCTS_DELETE':
            pos = state.findIndex(n => n.id_product === action.payload.id_product);
            aux = state;
            aux.splice(pos, 1);
            return aux
        case 'UPDATE_DETAIL_PRODUCTS_CLEAR':
            return action.payload
        default:
            return state
    }
}

export const payTypeReducer = (state = null, action) => {
    if(action.type === 'UPDATE_PAY_TYPE'){
        return action.payload
    }
    return state
}

export const totalAmountReducer = (state = null, action) => {
    if(action.type === 'UPDATE_TOTAL_AMOUNT'){
        return action.payload
    }
    return state
}

export const productSelectedReducer = (state = null, action) => {
    if(action.type === 'UPDATE_PRODUCT_SELECTED'){
        return action.payload
    }
    return state
}

export const refreshReducer = (state = false, action) => {
    if(action.type === 'UPDATE_REFRESH'){
        return action.payload
    }
    return state
}

export const productsXsuppliesReducer = (state = [], action) => {
    if(action.type === 'UPDATE_PRODUCTS_X_SUPPLIES'){
        return action.payload
    }
    return state
}

export const suppliesReducer = (state = [], action) => {
    if(action.type === 'UPDATE_SUPPLIES'){
        return action.payload
    }
    return state
}

export const paymentAmountReducer = (state = null, action) => {
    if(action.type === 'UPDATE_PAYMENT_AMOUNT'){
        return action.payload
    }
    return state
}

export const salesRegisterReducer = (state = true, action) => {
    if(action.type === 'SALES_REGISTER'){
        return action.payload
    }
    return state
}