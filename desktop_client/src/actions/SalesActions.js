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

export const updateDetailsProductsModify = (array) =>{
    return {
        type: 'UPDATE_DETAIL_PRODUCTS_MODIFY',
        payload: array
    }
}

export const updateDetailsProductsDelete = (array) =>{
    return {
        type: 'UPDATE_DETAIL_PRODUCTS_DELETE',
        payload: array
    }
}

export const updateDetailsProductsClear = (array) =>{
    return {
        type: 'UPDATE_DETAIL_PRODUCTS_CLEAR',
        payload: array
    }
}

export const updatePayType = (id) => {
    return {
        type: 'UPDATE_PAY_TYPE',
        payload: id
    }
}

export const updateTotalAmount = (amount) => {
    return {
        type: 'UPDATE_TOTAL_AMOUNT',
        payload: amount
    }
}

export const updateProductSelected = (product) => {
    return {
        type: 'UPDATE_PRODUCT_SELECTED',
        payload: product
    }
}

export const updateRefresh = (bool) => {
    return {
        type: 'UPDATE_REFRESH',
        payload: bool
    }
}

export const updateProductsXSupplies = (array) =>{
    return {
        type: 'UPDATE_PRODUCTS_X_SUPPLIES',
        payload: array
    }
}

export const updateSupplies = (array) =>{
    return {
        type: 'UPDATE_SUPPLIES',
        payload: array
    }
}

export const updatePaymentAmount = (amount) => {
    return {
        type: 'UPDATE_PAYMENT_AMOUNT',
        payload: amount
    }
}

export const updateSalesRegister = (state) => {
    return {
        type: 'SALES_REGISTER',
        payload: state
    }
}