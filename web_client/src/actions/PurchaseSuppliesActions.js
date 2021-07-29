//Actions
export const updatePurchaseNumber = (number) =>{
    return{
        type: 'UPDATE_PURCHASE_NUMBER',
        payload: number
    }
}

export const updatePurchaseDate = (date) =>{
    return{
        type: 'UPDATE_PURCHASE_DATE',
        payload: date
    }
}

export const updatePurchaseSupplier = (supplier) =>{
    return{
        type: 'UPDATE_PURCHASE_SUPPLIER',
        payload: supplier
    }
}

export const updatePurchaseSupplies = (supplies) =>{
    return{
        type: 'UPDATE_PURCHASE_SUPPLIES',
        payload: supplies
    }
}

export const updatePurchaseQuantity = (quantity,id) =>{
    return{
        type: 'UPDATE_PURCHASE_QUANTITY',
        payload: {quantity,id}
    }
}

export const addPurchaseQuantity = (quantity) => {
    return{
        type: 'ADD_PURCHASE_QUANTITY',
        payload: quantity
    }
}

export const removePurchaseQuantity = (id) => {
    return{
        type: 'REMOVE_PURCHASE_QUANTITY',
        payload: id
    }
}

export const resetPurchaseQuantity = () => {
    return{
        type: 'RESET_PURCHASE_QUANTITY'
    }
}

export const updatePurchasePrice = (price,id) =>{
    return{
        type: 'UPDATE_PURCHASE_PRICES',
        payload: {price,id}
    }
}

export const addPurchasePrice = (price) => {
    return{
        type: 'ADD_PURCHASE_PRICES',
        payload: price
    }
}

export const removePurchasePrice = (id) => {
    return{
        type: 'REMOVE_PURCHASE_PRICES',
        payload: id
    }
}

export const resetPurchasePrice = () => {
    return{
        type: 'RESET_PURCHASE_PRICES'
    }
}

export const updatePurchaseSubtotal = (subtotal,id) =>{
    return{
        type: 'UPDATE_PURCHASE_SUBTOTAL',
        payload: {subtotal,id}
    }
}

export const addPurchaseSubtotal = (subtotal) => {
    return{
        type: 'ADD_PURCHASE_SUBTOTAL',
        payload: subtotal
    }
}

export const removePurchaseSubtotal = (id) => {
    return{
        type: 'REMOVE_PURCHASE_SUBTOTAL',
        payload: id
    }
}

export const resetPurchaseSubtotal = () => {
    return{
        type: 'RESET_PURCHASE_SUBTOTAL'
    }
}

export const updatePurchaseTotal = (total) => {
    return{
        type: 'UPDATE_PURCHASE_TOTAL',
        payload: total
    }
}