
export const elementsTableUp = (state = [], action) => {
    if(action.type === 'UPDATE_TABLEUP') return action.payload;
    return state;
}

export const allElements = (state = [], action) => {
    if(action.type === 'UPDATE_ALL_ELEMENTS') return action.payload;
    return state;
}

export const elementsTableDown = (state = [], action) => {
    if(action.type === 'UPDATE_TABLEDOWN') return action.payload;
    return state;
}