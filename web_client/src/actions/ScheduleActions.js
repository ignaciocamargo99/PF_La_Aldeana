
export const updateNonworkingDaysInMonthSchedule = (nonworkingDaysInMonth) =>{
    return{
        type: 'UPDATE_NONWORKINGDAYS_MONTH_SCHEDULE',
        payload: nonworkingDaysInMonth
    }
}

export const updateMonthYearSelectedSchedule = (month,year) =>{
    return{
        type: 'UPDATE_MONTH_YEAR_SELECTED_SCHEDULE',
        payload: { month: month, year: year }
    }
}

export const updateSchedule = (schedule) =>{
    return{
        type: 'UPDATE_SCHEDULE',
        payload: schedule
    }
}
