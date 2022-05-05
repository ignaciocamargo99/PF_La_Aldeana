
export const nonworkingDaysInMonthSchedule = (state = null ,action) => {
    if(action.type === 'UPDATE_NONWORKINGDAYS_MONTH_SCHEDULE'){
        return action.payload; 
    } 
    return state;
}

let today = new Date();
export const monthYearSelectedSchedule = (state = { month: today.getMonth() , year: today.getFullYear()} ,action) => {
    if(action.type === 'UPDATE_MONTH_YEAR_SELECTED_SCHEDULE'){
        state.month = action.payload.month;
        state.year = action.payload.year;
        return state; 
    } 
    return state;
}

export const schedule = (state = null, action) => {
    if(action.type === 'UPDATE_SCHEDULE'){
        return action.payload; 
    } 
    return state;
}