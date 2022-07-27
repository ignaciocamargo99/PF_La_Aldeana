//Reducers
export const location = (state = 0, action) => {
    if (action.type === 'TO_ROOT') {
        return action.payload;
    }

    if (action.type === 'TO_CHAMBER_FLAVORS_DISPATCH') {
        return action.payload;
    }

    if (action.type === 'TO_REGISTER_ATTENDANCE') {
        return action.payload;
    }

    if (action.type === 'TO_SALES_LOCAL') {
        return action.payload;
    }

    if (action.type === 'TO_SALES_DELIVERY') {
        return action.payload;
    }

    return state;
};

export const menu = (state = true, action) => {
    if (action.type === 'LOCK_MENU') {
        return action.payload;
    }

    if (action.type === 'UNLOCK_MENU') {
        return action.payload;
    }
    return state;
};
