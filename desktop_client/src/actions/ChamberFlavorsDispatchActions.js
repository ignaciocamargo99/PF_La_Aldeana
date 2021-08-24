
export const updateChamberFlavorsDate = (date) => {
    return {
        type: 'UPDATE_FLAVORS_DATE',
        payload: date
    };
};

export const updateFiltersFlavors = (filters) => {
    return {
        type: 'UPDATE_FLAVORS_FILTERS',
        payload: filters
    };
};

export const updateFlavors = (flavors) => {
    return {
        type: 'UPDATE_FLAVORS',
        payload: flavors
    };
};

export const updateAllFlavors = (flavors) => {
    return {
        type: 'UPDATE_ALL_FLAVORS',
        payload: flavors
    };
};

export const updateFlavorsListDown = (flavors) => {
    return {
        type: 'UPDATE_LISTDOWN_FLAVORS',
        payload: flavors
    };
};