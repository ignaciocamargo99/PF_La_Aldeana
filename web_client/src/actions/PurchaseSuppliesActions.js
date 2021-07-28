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