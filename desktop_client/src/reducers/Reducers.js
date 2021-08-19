import { combineReducers } from "redux"
import { flavorsDispatchDate } from "./ChamberFlavorsDispatchReducer";
import { productsReducer } from "./SalesReducers";

export default combineReducers({
    flavorsDispatchDate: flavorsDispatchDate,
    products: productsReducer
})