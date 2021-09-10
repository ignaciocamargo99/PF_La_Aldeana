import { combineReducers } from "redux"
import { flavorsDispatchDate, flavorsDispatchFilters, } from "./ChamberFlavorsDispatchReducer";
import { clientsDeliveryReducer,payTypeDeliveryReducer, amountDeliveryReducer, totalDeliveryReducer, errorAmountDeliveryReducer,
     cellphoneDeliveryReducer, errorCellphoneDeliveryReducer, namesDeliveryReducer, errorNamesDeliveryReducer,
     streetDeliveryReducer, errorStreetDeliveryReducer, streetNumberDeliveryReducer, errorStreetNumberDeliveryReducer,
     detailsDeliveryReducer,flavorsProductDeliveryReducer, productsQuantitiesDeliveryReducer} from "./DeliverySalesReducers";
import { productsReducer, productsFilteredReducer, detailProductsReducer, payTypeReducer, totalAmountReducer, productSelectedReducer, 
    refreshReducer, suppliesReducer, productsXsuppliesReducer, paymentAmountReducer} from "./SalesReducers";
import { location, menu } from "./MenuReducers"
import { elementsTableUp, allElements, elementsTableDown } from "./TableUpDownReducer";

export default combineReducers({
    products: productsReducer,
    productsFiltered: productsFilteredReducer,
    detailProducts: detailProductsReducer,
    payType: payTypeReducer,
    totalAmount: totalAmountReducer,
    productSelected: productSelectedReducer,
    refresh: refreshReducer,
    productsXsupplies: productsXsuppliesReducer,
    supplies: suppliesReducer,
    paymentAmount: paymentAmountReducer,
    //Menu
    location: location,
    menu: menu,
    // Chamber flavors
    flavorsDispatchDate: flavorsDispatchDate,
    flavorsDispatchFilters: flavorsDispatchFilters,
    // Table Up-Down
    elementsTableUp: elementsTableUp,
    allElements: allElements,
    elementsTableDown: elementsTableDown,
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
    clientsDelivery: clientsDeliveryReducer
})
