//Actions
export const updateNameSupply = (nameSupply) =>{
    return{
        type: 'UPDATE_NAME_SUPPLY',
        payload: nameSupply
    }
}

export const updateDescriptionSupply = (descriptionSupply) =>{
    return{
        type: 'UPDATE_DESCRIPTION_SUPPLY',
        payload: descriptionSupply
    }
}

export const updateSinglePrice = (singlePrice) =>{
    return{
        type: 'UPDATE_SINGLE_PRICE',
        payload: singlePrice
    }
}

export const updateMultiplePrice = (multiplePrice) =>{
    return{
        type: 'UPDATE_MULTIPLE_PRICE',
        payload: multiplePrice
    }
}

export const updateTypeSupply = (typeSupply) =>{
    return{
        type: 'UPDATE_TYPE_SUPPLY',
        payload: typeSupply
    }
}

export const updateLotSupply = (lotSupply) =>{
    return{
        type: 'UPDATE_LOT_SUPPLY',
        payload: lotSupply
    }
}

export const updateUnitPerLotSupply = (unitPerLotSupply) =>{
    return{
        type: 'UPDATE_UNIT_PER_LOT_SUPPLY',
        payload: unitPerLotSupply
    }
}

export const updateUnitSupply = (unitSupply) =>{
    return{
        type: 'UPDATE_UNIT_SUPPLY',
        payload: unitSupply
    }
}

export const isDeliverySupply = (delivery) =>{
    return{
        type: 'IS_DELIVERY_SUPPLY',
        payload: delivery
    }
}

export const isFranchiseSupply = (franchise) =>{
    return{
        type: 'IS_FRANCHISE_SUPPLY',
        payload: franchise
    }
}