//Actions

export const updateProductionDate = (date) =>{
    return{
        type: 'UPDATE_PRODUCTION_DATE',
        payload: date
    }
}

export const updateFlavors = (flavors) =>{
    return{
        type: 'UPDATE_FLAVORS',
        payload: flavors
    }
}

export const updateFlavorQuantity = (quantity,id) =>{
    return{
        type: 'UPDATE_FLAVOR_QUANTITY',
        payload: {quantity,id}
    }
}

export const addFlavorQuantity = (quantity) => {
    return{
        type: 'ADD_FLAVOR_QUANTITY',
        payload: quantity
    }
}

export const removeFlavorQuantity = (id) => {
    return{
        type: 'REMOVE_FLAVOR_QUANTITY',
        payload: id
    }
}