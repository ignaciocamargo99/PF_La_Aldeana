import formattedDate from '../utils/ConverterDate/formattedDate'

export const dateReducer = (state = formattedDate(new Date()), action) => {
    if(action.type === 'UPDATE_DATE'){
        action.payload = formattedDate(action.payload);
        return action.payload
    }
    return state
} 