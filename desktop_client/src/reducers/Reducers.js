import { combineReducers } from "redux"
import { flavorsDispatchDate } from "./ChamberFlavorsDispatchReducer";
import { clientsDeliveryReducer,payTypeDeliveryReducer, amountDeliveryReducer, totalDeliveryReducer, errorAmountDeliveryReducer,
     cellphoneDeliveryReducer, errorCellphoneDeliveryReducer, namesDeliveryReducer, errorNamesDeliveryReducer,
     streetDeliveryReducer, errorStreetDeliveryReducer, streetNumberDeliveryReducer, errorStreetNumberDeliveryReducer,
     detailsDeliveryReducer,flavorsProductDeliveryReducer, productsQuantitiesDeliveryReducer} from "./DeliverySalesReducers";
import { productsReducer, productsFilteredReducer, detailProductsReducer, payTypeReducer, totalAmountReducer, productSelectedReducer, refreshReducer} from "./SalesReducers";

export default combineReducers({
    flavorsDispatchDate: flavorsDispatchDate,
    products: productsReducer,
    productsFiltered: productsFilteredReducer,
    detailProducts: detailProductsReducer,
    payType: payTypeReducer,
    totalAmount: totalAmountReducer,
    productSelected: productSelectedReducer,
    payTypeDelivery: payTypeDeliveryReducer,
    amountDelivery: amountDeliveryReducer,
    totalDelivery: totalDeliveryReducer,
    errorAmountDelivery: errorAmountDeliveryReducer,
    cellphoneDelivery: cellphoneDeliveryReducer,
    errorCellphoneDelivery: errorCellphoneDeliveryReducer,
    streetDelivery: streetDeliveryReducer,
    errorStreetDelivery: errorStreetDeliveryReducer,
    namesDelivery: namesDeliveryReducer,
    errorNamesDelivery: errorNamesDeliveryReducer,
    streetNumberDelivery: streetNumberDeliveryReducer,
    errorStreetNumberDelivery: errorStreetNumberDeliveryReducer,
    detailsDelivery: detailsDeliveryReducer,
    flavorsProductDelivery: flavorsProductDeliveryReducer,
    productsQuantitiesDelivery: productsQuantitiesDeliveryReducer,
    clientsDelivery: clientsDeliveryReducer,
    refresh: refreshReducer
})