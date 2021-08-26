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
    if(action.type === 'UPDATE_DETAIL_PRODUCTS'){
        return [...state, action.payload]
    }
    return state
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

export const productSelectedReducer = (state = [], action) => {
    if(action.type === 'UPDATE_PRODUCT_SELECTED'){
        return action.payload
    }
    return state
}