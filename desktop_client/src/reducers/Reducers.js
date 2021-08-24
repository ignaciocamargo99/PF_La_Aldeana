import { combineReducers } from "redux"
import {
    flavorsDispatchDate, flavorsDispatchFilters,
    flavorsDispatch, allFlavorsDispatch, flavorsListDownDispatch
} from "./ChamberFlavorsDispatchReducer";

export default combineReducers({
    flavorsDispatchDate: flavorsDispatchDate,
    flavorsDispatchFilters: flavorsDispatchFilters,
    flavorsDispatch: flavorsDispatch,
    allFlavorsDispatch: allFlavorsDispatch,
    flavorsListDownDispatch: flavorsListDownDispatch
});