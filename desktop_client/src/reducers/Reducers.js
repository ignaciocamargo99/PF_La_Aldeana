import { combineReducers } from "redux"
import { flavorsDispatchDate, flavorsDispatchFilters } from "./ChamberFlavorsDispatchReducer";

export default combineReducers({
    flavorsDispatchDate: flavorsDispatchDate,
    flavorsDispatchFilters: flavorsDispatchFilters
});