export const updateProducts = (array) =>{
    return {
        type: 'UPDATE_PRODUCTS',
        payload: array
    }
}

export const updateProductsFiltered = (array) =>{
    return {
        type: 'UPDATE_PRODUCTS_FILTERED',
        payload: array
    }
}

export const updateDetailProducts = (array) =>{
    return {
        type: 'UPDATE_DETAIL_PRODUCTS',
        payload: array
    }
}