export const flavorsDispatchDate = (state = null ,action) => {
    if(action.type === 'UPDATE_FLAVORS_DATE') return action.payload;
    return state;
}

export const flavorsDispatchFilters = (state = [], action) => {
    if(action.type === 'UPDATE_FLAVORS_FILTERS') return action.payload;
    return state;
}

export const flavorsDispatch = (state = [], action) => {
    if(action.type === 'UPDATE_FLAVORS') return action.payload;
    return state;
}

export const allFlavorsDispatch = (state = [], action) => {
    if(action.type === 'UPDATE_ALL_FLAVORS') return action.payload;
    return state;
}

export const flavorsListDownDispatch = (state = [], action) => {
    if(action.type === 'UPDATE_LISTDOWN_FLAVORS') return action.payload;
    return state;
}
