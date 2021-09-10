
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

export const refreshView = (refresh) => {
    return {
        type: 'REFRESH_VIEW',
        payload: refresh
    };
};