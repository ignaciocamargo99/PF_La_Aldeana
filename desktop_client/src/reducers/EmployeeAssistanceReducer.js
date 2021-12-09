export const employeeAssistance = (state = true, action) => {
    if (action.type === 'UPDATE_ASSISTANCE_EMPLOYEE') return action.payload;
    return state;
}