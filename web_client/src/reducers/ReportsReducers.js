export const dateTo = (state = "2021-01-01", action) => {
    if(action.type === 'UPDATE_REPORT_DATE_TO'){
        return action.payload
    }
    return state
}

export const dateFrom = (state = "2021-01-01", action) => {
    if(action.type === 'UPDATE_REPORT_DATE_FROM'){
        return action.payload
    }
    return state
}

export const productSales = (state = [], action) => {
    if(action.type === 'UPDATE_PRODUCT_SALES'){
        return action.payload
    }
    return state
} 