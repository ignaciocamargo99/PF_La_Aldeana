//Actions
export const updateReportDateTo = (dateTo) =>{
    return{
        type: 'UPDATE_REPORT_DATE_TO',
        payload: dateTo
    }
}

export const updateReportDateFrom = (dateFrom) =>{
    return{
        type: 'UPDATE_REPORT_DATE_FROM',
        payload: dateFrom
    }
}

export const updateProductSales = (productSales) =>{
    return{
        type: 'UPDATE_PRODUCT_SALES',
        payload: productSales
    }
}