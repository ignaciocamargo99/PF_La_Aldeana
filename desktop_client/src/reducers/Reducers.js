import { combineReducers } from "redux"
import { flavorsDispatchDate } from "./ChamberFlavorsDispatchReducer";
import { productsReducer, productsFilteredReducer, detailProductsReducer, payTypeReducer, totalAmountReducer, productSelectedReducer, refreshReducer} from "./SalesReducers";

export default combineReducers({
    flavorsDispatchDate: flavorsDispatchDate,
    products: productsReducer,
    productsFiltered: productsFilteredReducer,
    detailProducts: detailProductsReducer,
    payType: payTypeReducer,
    totalAmount: totalAmountReducer,
    productSelected: productSelectedReducer,
    refresh: refreshReducer
})