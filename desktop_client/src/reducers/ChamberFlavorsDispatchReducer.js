
export const flavorsDispatchDate = (state = null ,action) => {
    if(action.type === 'UPDATE_FLAVORS_DATE') return action.payload;
    return state;
}

export const flavorsDispatchFilters = (state = [], action) => {
    if(action.type === 'UPDATE_FLAVORS_FILTERS') return action.payload;
    return state;
}

export const refresh = (state = null, action) => {
    if(action.type === 'REFRESH_VIEW') return action.payload;
    return state;
}
