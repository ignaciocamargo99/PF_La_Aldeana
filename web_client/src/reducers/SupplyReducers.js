//Reducers
export const nameSupply = (state = 'null' ,action) => {
    if(action.type === 'UPDATE_NAME_SUPPLY'){
        return action.payload
    }
    return state
}

export const descriptionSupply = (state = 'null' ,action) => {
    if(action.type === 'UPDATE_DESCRIPTION_SUPPLY'){
        return action.payload
    }
    return state
}

export const singlePrice = (state = 0 ,action) => {
    if(action.type === 'UPDATE_SINGLE_PRICE'){
        return action.payload
    }
    return state
}

export const multiplePrice = (state = 0 ,action) => {
    if(action.type === 'UPDATE_MULTIPLE_PRICE'){
        return action.payload
    }
    return state
}

export const typeSupply = (state = -1 ,action) => {
    if(action.type === 'UPDATE_TYPE_SUPPLY'){
        return action.payload
    }
    return state
}

export const lotSupply = (state = 0 ,action) => {
    if(action.type === 'UPDATE_LOT_SUPPLY'){
        return action.payload
    }
    return state
}

export const unitPerLotSupply = (state = 0 ,action) => {
    if(action.type === 'UPDATE_UNIT_PER_LOT_SUPPLY'){
        return action.payload
    }
    return state
}

export const unitSupply = (state = 0 ,action) => {
    if(action.type === 'UPDATE_UNIT_SUPPLY'){
        return action.payload
    }
    return state
}