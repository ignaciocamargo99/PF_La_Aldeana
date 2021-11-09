
export const schedule = (state = [] ,action) => {
    if(action.type === 'ADD_DAY_SCHEDULE'){
        state.push({ date: action.payload.date, turns: [[],[],[],[]]})
        return state
    }
    if(action.type === 'ADD_EMP_IN_TURN_SCHEDULE'){
        state[action.payload.day].turns[action.payload.turn].push(action.payload.employee)
        return state
    }
    if(action.type === 'DELETE_EMP_IN_TURN_SCHEDULE'){

    }
    return state
}