export const updateTableUp = (elements) => {
    return {
        type: 'UPDATE_TABLEUP',
        payload: elements
    };
};

export const updateAllElements = (elements) => {
    return {
        type: 'UPDATE_ALL_ELEMENTS',
        payload: elements
    };
};

export const updateTableDown = (elements) => {
    return {
        type: 'UPDATE_TABLEDOWN',
        payload: elements
    };
};