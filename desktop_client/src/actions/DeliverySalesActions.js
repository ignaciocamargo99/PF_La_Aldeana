export const updatePayTypeDelivery = (payType) => {
    return{
        type: 'UPDATE_PAY_TYPE',
        payload: payType
    }
}

export const updateAmountDelivery = (amount) => {
    return{
        type: 'UPDATE_AMOUNT',
        payload: amount
    }
}

export const sumTotalDelivery = (amount) => {
    return{
        type: 'SUM_TOTAL',
        payload: amount
    }
}

export const subtractTotalDelivery = (amount) => {
    return{
        type: 'SUBTRACT_TOTAL',
        payload: amount
    }
}

export const updateErrorAmountDelivery = (error) => {
    return{
        type: 'UPDATE_ERROR_AMOUNT',
        payload: error
    }
}

export const updateCellphoneDelivery = (cellphone) => {
    return{
        type: 'UPDATE_CELLPHONE',
        payload: cellphone
    }
}

export const updateErrorCellphoneDelivery = (error) => {
    return{
        type: 'UPDATE_ERROR_CELLPHONE',
        payload: error
    }
}

export const updateNamesDelivery = (names) => {
    return{
        type: 'UPDATE_NAMES',
        payload: names
    }
}

export const updateErrorNamesDelivery = (error) => {
    return{
        type: 'UPDATE_ERROR_NAMES',
        payload: error
    }
}

export const updateStreetDelivery = (street) => {
    return{
        type: 'UPDATE_STREET',
        payload: street
    }
}

export const updateErrorStreetDelivery = (error) => {
    return{
        type: 'UPDATE_ERROR_STREET',
        payload: error
    }
}

export const updateStreetNumberDelivery = (streetNumber) => {
    return{
        type: 'UPDATE_STREET_NUMBER',
        payload: streetNumber
    }
}

export const updateErrorStreetNumberDelivery = (error) => {
    return{
        type: 'UPDATE_ERROR_STREET_NUMBER',
        payload: error
    }
}

export const addDetailDelivery = (detail) => {
    return{
        type: 'ADD_DETAIL_DELIVERY',
        payload: detail
    }
}

export const deleteDetailDelivery = (i) => {
    return{
        type: 'DELETE_DETAIL_DELIVERY',
        payload: i
    }
}

export const updateDetailDelivery = (detail,i) => {
    return{
        type: 'UPDATE_DETAIL_DELIVERY',
        payload: {'detail': detail,'i':i}
    }
}

export const resetDetailDelivery = () => {
    return{
        type: 'RESET_DETAIL_DELIVERY'
    }
}

export const updateFlavorsProduct = (flavorsProduct,i) => {
    return{
        type: 'UPDATE_FLAVORS_PRODUCT',
        payload: {'flavorsProduct': flavorsProduct,'i':i}
    }
}

export const addFlavorsProduct = (flavor,i) => {
    return{
        type: 'ADD_FLAVORS_PRODUCT',
        payload: {'flavor': flavor,'i':i}
    }
}

export const deleteFlavorsProduct = (i,j) => {
    return{
        type: 'DELETE_FLAVORS_PRODUCT',
        payload: {'i': i,'j':j}
    }
}

export const updateAllFlavorsProduct = (flavorsProduct) => {
    return{
        type: 'UPDATE_ALL_FLAVORS_PRODUCT',
        payload: flavorsProduct
    }
}

export const updateDeliveryProductsQuantities = (productsQuantities) => {
    return{
        type: 'UPDATE_DELIVERY_PRODUCTS_QUANTITIES',
        payload: productsQuantities
    }
}

export const updateDeliveryProductQuantity = (productQuantity,i) => {
    return{
        type: 'UPDATE_DELIVERY_PRODUCT_QUANTITY',
        payload: {'productQuantity': productQuantity,'i':i}
    }
}

export const updateDeliveryClients = (clients) => {
    return{
        type: 'UPDATE_DELIVERY_CLIENTS',
        payload: clients
    }
}