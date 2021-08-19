import { combineReducers } from "redux"
import { flavorsDispatchDate, flavorsDispatchFilters, flavorsDispatch } from "./ChamberFlavorsDispatchReducer";

export default combineReducers({
    flavorsDispatchDate: flavorsDispatchDate,
    flavorsDispatchFilters: flavorsDispatchFilters,
    flavorsDispatch: flavorsDispatch
});