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
    switch (action.type) {
        case 'UPDATE_DETAIL_PRODUCTS':
            return [...state, action.payload]
        case 'UPDATE_DETAIL_PRODUCTS_MODIFY':
            let pos = state.findIndex(n => n.id_product == action.payload.id_product);
            console.log(pos);
            let aux = state;
            aux[pos] = action.payload;
            //state.splice(pos, 1, action.payload);  
            //console.log(newArray);  
            //let first = state.slice(0,pos);
            //let last = state.slice(pos, state.length);
            //first.concat(action.payload,last);  
            return aux
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

export const productSelectedReducer = (state = [], action) => {
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