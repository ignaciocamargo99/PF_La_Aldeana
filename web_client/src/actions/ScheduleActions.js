
export const addDaySchedule = (date) =>{
    return{
        type: 'ADD_DAY_SCHEDULE',
        payload: {date: date}
    }
}

export const addEmplInTurnSchedule = (employee,turn,day) =>{
    return{
        type: 'ADD_EMP_IN_TURN_SCHEDULE',
        payload: {employee: employee, turn: turn, day: day}
    }
}

export const deleteEmplInTurnSchedule = (employee,turn,day) =>{
    return{
        type: 'DELETE_EMP_IN_TURN_SCHEDULE',
        payload: {employee: employee, turn: turn, day: day}
    }
}
